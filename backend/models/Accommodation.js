const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  message: { type: String },
  accommodationPlace: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Accommodation', AccommodationSchema);