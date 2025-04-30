const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  budgetRange: { type: String, required: true },
  event: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sponsor', SponsorSchema);