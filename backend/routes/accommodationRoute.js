const express = require('express');
const Accommodation = require('../models/Accommodation'); // Import the Accommodation model

const router = express.Router();

// POST route to handle accommodation form submissions
router.post('/', async (req, res) => {
    try {
        const accommodationData = req.body; // Get form data from the request body
        const newAccommodation = new Accommodation(accommodationData); // Create a new Accommodation document
        await newAccommodation.save(); // Save the document to MongoDB
        res.status(201).json({ message: 'Accommodation data saved successfully!' });
    } catch (error) {
        console.error('Error saving accommodation data:', error);
        res.status(500).json({ message: 'Failed to save accommodation data', error });
    }
});

module.exports = router;