require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors'); // Import CORS middleware
const sponsorRoute = require('./routes/sponsorRoute'); // Import the sponsor route

const eventRoute = require('./routes/eventRoute'); // Import the event route

const accommodationRoute = require('./routes/accommodationRoute'); // Import the accommodation route
const orderRoute = require('./routes/orderRoute')


const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB connection string from .env
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Omin route
app.use('/api/sponsors', sponsorRoute);
app.use('/api/orders', orderRoute);

// Use the accommodation route
app.use('/api/accommodations', accommodationRoute);

// Dula route
app.use('/api/events', eventRoute);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});