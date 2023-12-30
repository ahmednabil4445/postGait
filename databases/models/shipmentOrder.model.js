const mongoose = require("mongoose");

const shipmentOrderSchema = new mongoose.Schema(
  {
    clientName: {
      type: mongoose.Types.ObjectId,
      ref: 'client',
      required: true
    },
    store: {
      type: mongoose.Types.ObjectId,
      ref: 'store',
      required: true
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shipmentOrder", shipmentOrderSchema);
