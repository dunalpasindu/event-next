const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  organizationName: {type: String, required: true,},
  email: { type: String, required: true,},
  phoneNumber: { type: String, required: true,},
  eventType: { type: String, required: true,},
  numberOfGuests: { type: String, required: true,},
  dietaryPreferences: { type: String, required: true,},
  additionalComments: { type: String,  required: true, },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);