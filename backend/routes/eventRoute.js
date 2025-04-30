const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

// Route to handle form submission
router.post('/register', async (req, res) => {
  try {
    // Create a new event using the request body
    const newEvent = new Event(req.body);

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Respond with the saved event
    res.status(201).json({
      message: 'Event registered successfully!',
      event: savedEvent,
    });
  } catch (error) {
    // Handle validation or server errors
    res.status(400).json({
      message: 'Error registering event',
      error: error.message,
    });
  }
});

// Route to fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Route to fetch an event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// Route to delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// Route to update an event by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
});

module.exports = router;