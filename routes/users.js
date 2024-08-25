const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const User = require('../models/User'); // Sequelize User model
const FamilyMember = require('../models/FamilyMember'); // Sequelize FamilyMember model

// Handle form submission
router.post('/submit-details', async(req, res) => {
    const { fullName, username, age, nationalId } = req.body;

    try {
        let user;

        if (age >= 18) {
            // Ensure National ID is provided for adults
            if (!nationalId) {
                return res.status(400).send('National ID is required for users 18 and older.');
            }

            // Check if the nationalId and username both match
            const existingUser = await User.findOne({ where: { nationalId, username } });
            if (existingUser) {
                return res.status(400).send('Username or National ID already exists. Please choose a different username.');
            }

            user = await User.create({ fullName, username, age, nationalId });
        } else {
            // Generate a unique ID for users under 18
            const uniqueId = uuidv4();
            const existingUser = await User.findOne({ where: { username, uniqueId } });
            if (existingUser) {
                return res.status(400).send('Username already exists. Please choose a different username.');
            }

            user = await User.create({ fullName, username, age, uniqueId });
        }

        // Redirect to a dashboard or confirmation page
        res.render('dashboard', {
            title: 'Dashboard',
            user: {
                ...user.toJSON(),
                siblings: user.siblings || [] // Initialize with an empty array for siblings
            },
            message: 'Your details have been submitted successfully!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request.');
    }
});



router.post('/add-sibling', async(req, res) => {
    // For testing purposes, manually set req.user if it doesn't exist
    if (!req.user) {
        // Find the user based on session or other means (this is just an example)
        req.user = await User.findByPk(1); // Assuming user ID 1 for example
    }

    const { siblingName, siblingAge, siblingNationalId } = req.body;
    const userId = req.user.id;

    try {
        let sibling;
        if (siblingAge >= 18 && siblingNationalId) {
            const existingSibling = await FamilyMember.findOne({ where: { nationalId: siblingNationalId } });
            if (existingSibling) {
                return res.status(400).send('Sibling National ID already exists. Please use a different ID.');
            }

            sibling = await FamilyMember.create({
                fullName: siblingName,
                age: siblingAge,
                nationalId: siblingNationalId,
                treeId: req.user.familyTree
            });
        } else {
            sibling = await FamilyMember.create({
                fullName: siblingName,
                age: siblingAge,
                treeId: req.user.familyTree
            });
        }

        // Update the user's siblings array
        const user = await User.findByPk(userId);
        let siblings = user.siblings || [];
        siblings.push(sibling.id);
        user.siblings = siblings;
        await user.save();

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while adding the sibling.');
    }
});

router.post('/login', async(req, res) => {
    const { username, nationalId } = req.body;

    try {
        let user;

        if (nationalId) {
            // User is 18 or older
            user = await User.findOne({ where: { username, nationalId } });
        } else {
            // User is under 18
            user = await User.findOne({ where: { username } });
        }

        if (!user) {
            return res.status(400).send('Username and National ID do not match our records. Please try again.');
        }

        // Redirect to dashboard
        res.render('dashboard', {
            title: 'Dashboard',
            user: {
                ...user.toJSON(),
                siblings: user.siblings || []
            },
            message: 'Welcome back!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request.');
    }
});


// Example route in your Node.js application
router.get('/dashboard', async(req, res) => {
    try {
        // Fetch all users from the database
        const allUsers = await User.findAll();

        // Pass the user data to the dashboard view
        res.render('dashboard', {
            title: 'Dashboard',
            user: req.user, // Current logged-in user
            allUsers: allUsers // All users in the system
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the users.');
    }
});


module.exports = router;