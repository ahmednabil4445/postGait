const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
  reference: String,
  amount: Number,
  currency: String,
  name: String,
  description: String,
  channel: String,
  category: String,
}, { timestamps: true })



module.exports = mongoose.model('payment', paymentSchema)