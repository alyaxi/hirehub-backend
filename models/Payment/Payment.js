// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: String,
  amount: Number,
  plans: String,
  paymentHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  nextPayment: Date,
  currentPaymentDate: Date,
  paymentStatus: { type: String, enum: ['Free', 'Paid', 'Pending'],
  default: 'Free'
 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
