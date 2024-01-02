const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({
    nameShop: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: [true, 'phone required'],
    },
    customerAddressDetails: {
        city: String,
        country:String,
        postalCode: Number,
        customerAddress: String,
        customerAddress_Elective: String
    }
}, { timestamps: true })



module.exports = mongoose.model('shop', shopSchema)
