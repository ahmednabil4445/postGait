const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    nameStore: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'phone required'],
    },
    customerAddressDetails: {
        cities: {
            name_en: { type: String},
            name_ar: { type: String },
        },
        country: {
            name_en: { type: String },
            name_ar: { type: String}
        },
        postalCode: Number,
        customerAddress: String,
        customerAddress_Elective: String
    }
}, { timestamps: true })



module.exports = mongoose.model('store', storeSchema)