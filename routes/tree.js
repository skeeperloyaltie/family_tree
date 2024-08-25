const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Load Tree and FamilyMember models
const Tree = require('../models/Tree');
const FamilyMember = require('../models/FamilyMember');

// Create a new tree
router.post('/create', ensureAuthenticated, async(req, res) => {
    const { treeName, firstMemberName } = req.body;
    try {
        // Create the family tree
        const tree = new Tree({ name: treeName, creator: req.user._id });
        await tree.save();

        // Create the first family member (e.g., the user themselves)
        const firstMember = new FamilyMember({ fullName: firstMemberName, tree: tree._id });
        await firstMember.save();

        // Link the first member to the tree
        tree.members.push(firstMember._id);
        await tree.save();

        // Link the tree to the user
        req.user.familyTree = tree._id;
        await req.user.save();

        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.redirect('/dashboard');
    }
});

// Add a family member (e.g., child, sibling, parent)
router.post('/add-member', ensureAuthenticated, async(req, res) => {
    const { memberName, relation, relatedMemberId } = req.body;

    try {
        // Find the related family member
        const relatedMember = await FamilyMember.findById(relatedMemberId);

        if (!relatedMember) {
            return res.status(404).send('Related family member not found');
        }

        // Create the new family member
        const newMember = new FamilyMember({ fullName: memberName, tree: relatedMember.tree });
        await newMember.save();

        // Update relationships based on the provided relation type
        switch (relation) {
            case 'child':
                relatedMember.children.push(newMember._id);
                newMember.parents.push(relatedMember._id);
                break;
            case 'parent':
                newMember.children.push(relatedMember._id);
                relatedMember.parents.push(newMember._id);
                break;
            case 'sibling':
                newMember.siblings.push(relatedMember._id);
                relatedMember.siblings.push(newMember._id);
                break;
            case 'spouse':
                relatedMember.spouse = newMember._id;
                newMember.spouse = relatedMember._id;
                break;
            default:
                return res.status(400).send('Invalid relation type');
        }

        // Save both members
        await relatedMember.save();
        await newMember.save();

        // Link the new member to the tree
        const tree = await Tree.findById(relatedMember.tree);
        tree.members.push(newMember._id);
        await tree.save();

        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.redirect('/dashboard');
    }
});

// Link two existing family trees
router.post('/link-trees', ensureAuthenticated, async(req, res) => {
    const { memberId1, memberId2 } = req.body;

    try {
        // Find both family members
        const member1 = await FamilyMember.findById(memberId1);
        const member2 = await FamilyMember.findById(memberId2);

        if (!member1 || !member2) {
            return res.status(404).send('One or both family members not found');
        }

        // Check if they are from different trees
        if (member1.tree.toString() === member2.tree.toString()) {
            return res.status(400).send('Both members are already in the same tree');
        }

        // Link the trees by merging their members
        const tree1 = await Tree.findById(member1.tree);
        const tree2 = await Tree.findById(member2.tree);

        tree1.members = [...new Set([...tree1.members, ...tree2.members])];
        tree2.members = tree1.members;

        // Save the updated trees
        await tree1.save();
        await tree2.save();

        // Update all members in tree2 to reference tree1
        await FamilyMember.updateMany({ tree: tree2._id }, { tree: tree1._id });

        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.redirect('/dashboard');
    }
});

module.exports = router;