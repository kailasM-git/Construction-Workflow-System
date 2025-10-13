const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userregister", // assuming you have a User model
    required: true,
  },
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultant", // assuming you have a Consultant model
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "consultplan", // replace with your actual plan/assignment model
    required: true,
  },
  stages: [Number], // like [1, 2]
  amount: [Number], // like [1, 2]
  currency: {
    type: String,
    default: "INR",
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0,
  },
  report: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
