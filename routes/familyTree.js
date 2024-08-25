const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Sequelize User model

// Route to display the family tree with all users
router.get('/family-tree', async (req, res) => {
    try {
        // If req.user is not set, find a user by a known ID (this is just an example)
        if (!req.user) {
            req.user = await User.findByPk(1); // Replace 1 with the correct user ID logic
        }

        // Fetch all users from the database
        const allUsers = await User.findAll();

        // Render the family tree view and pass the users
        res.render('family-tree', {
            title: 'Family Tree',
            user: req.user, // Current logged-in user
            allUsers: allUsers // All users in the system
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the family tree data.');
    }
});

module.exports = router;
