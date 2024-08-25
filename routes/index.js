const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Load User and Tree models
const User = require('../models/User');
const Tree = require('../models/Tree');
const FamilyMember = require('../models/FamilyMember');

// Home Page
router.get('/', (req, res) => {
    res.render('index', { title: 'Family Tree Home' }); // Pass the title variable here
});

// Dashboard (Protected)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user,
        title: 'Dashboard' // Pass the title for the dashboard as well
    });
});

module.exports = router;