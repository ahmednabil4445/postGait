const mongoose = require('mongoose')

const shipmentSchema = mongoose.Schema({
    clientName: {
        type: String
    },
    productName: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    storeName: {
        type: String,
        required: true
    },
    shippingCompany: {
        type: String,
        required: true
    },
    clientAddress: {
        city: String,
        country: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number,
        default:0
    },
}, { timestamps: true })



module.exports = mongoose.model('Shipment', shipmentSchema)
