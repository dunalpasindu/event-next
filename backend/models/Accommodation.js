const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  accommodationId: { type: String, required: true },
  accommodationName: { type: String, required: true },
  price: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    message: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Accommodation', AccommodationSchema);