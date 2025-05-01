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

// Add a GET route to fetch all accommodations
router.get('/', async (req, res) => {
    try {
        const accommodations = await Accommodation.find(); // Fetch all accommodation documents
        res.status(200).json(accommodations); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching accommodations:', error);
        res.status(500).json({ message: 'Failed to fetch accommodations', error });
    }
});

// Add a PUT route to update a booking by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json(updatedAccommodation);
    } catch (error) {
        console.error('Error updating accommodation:', error);
        res.status(500).json({ message: 'Failed to update accommodation', error });
    }
});

// Add a DELETE route to delete a booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        console.error('Error deleting accommodation:', error);
        res.status(500).json({ message: 'Failed to delete accommodation', error });
    }
});

module.exports = router;