const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  place: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  tipPercentage: { type: Number, required: true },
  tipAmount: { type: Number, required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;