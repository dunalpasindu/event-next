const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    houseNo: { type: String, required: true },
    addressLine: { type: String, required: true },
    addressLine2: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);