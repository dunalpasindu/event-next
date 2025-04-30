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

// GET route to fetch all sponsor data
router.get('/', async (req, res) => {
    try {
        const sponsors = await Sponsor.find(); // Fetch all sponsor documents
        res.status(200).json(sponsors); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching sponsor data:', error);
        res.status(500).json({ message: 'Failed to fetch sponsor data', error });
    }
});

// GET route to fetch a single sponsor by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sponsor = await Sponsor.findById(id); // Fetch sponsor by ID
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found' });
        }
        res.status(200).json(sponsor);
    } catch (error) {
        console.error('Error fetching sponsor:', error);
        res.status(500).json({ message: 'Failed to fetch sponsor', error });
    }
});

// DELETE route to delete a sponsor by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Sponsor.findByIdAndDelete(id); // Delete the sponsor document by ID
        res.status(200).json({ message: 'Sponsor deleted successfully!' });
    } catch (error) {
        console.error('Error deleting sponsor:', error);
        res.status(500).json({ message: 'Failed to delete sponsor', error });
    }
});

// PUT route to update a sponsor by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedSponsor = await Sponsor.findByIdAndUpdate(id, updatedData, { new: true }); // Update the sponsor document
        res.status(200).json(updatedSponsor);
    } catch (error) {
        console.error('Error updating sponsor:', error);
        res.status(500).json({ message: 'Failed to update sponsor', error });
    }
});

module.exports = router;