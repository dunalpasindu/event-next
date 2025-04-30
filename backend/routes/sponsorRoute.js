const express = require('express');
const Sponsor = require('../models/Sponsor'); // Import the Sponsor model

const router = express.Router();

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        const sponsorData = req.body; // Get form data from the request body
        const newSponsor = new Sponsor(sponsorData); // Create a new Sponsor document
        await newSponsor.save(); // Save the document to MongoDB
        res.status(201).json({ message: 'Sponsor data saved successfully!' });
    } catch (error) {
        console.error('Error saving sponsor data:', error);
        res.status(500).json({ message: 'Failed to save sponsor data', error });
    }
});

module.exports = router;