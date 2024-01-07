const mongoose = require('mongoose')

const shipmentSchema = mongoose.Schema({
    clientName: {
        type: String
    },
    product: {
        type: String
    },
    storeName: {
        type: String,
        required: true
    },
    shipingCompany: {
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
