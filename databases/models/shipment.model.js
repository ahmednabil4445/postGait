const mongoose = require('mongoose')

const shipmentSchema = mongoose.Schema({
    clientName: {
        type: String
    },
    productName: {
        type: String
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
}, { timestamps: true })



module.exports = mongoose.model('Shipment', shipmentSchema)
