const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    nameCustomer: {
        type: String
    },
    storeName: {
        type: String
    },
    shippingCompany: {
        type: String
    },
    dataRequest: {
        type: Date
    },
    price: {
        type: Number
    },
  
    
}, { timestamps: true })



module.exports = mongoose.model('bill', billSchema)