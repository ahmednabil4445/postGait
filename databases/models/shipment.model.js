const mongoose = require('mongoose')

const shipmentSchema = mongoose.Schema({
    clientName: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
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