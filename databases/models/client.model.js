const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'E-mail must be unique'],
        required: [true, 'E-mail required'],
        minLength: 1
    },
    phone: {
        type: String,
        required: true,
        minLength: [5, 'MinLength 5 Characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'client'],
        default: "client"
    },
    customerAddressDetails: {
        cities: {
            name_en: { type: String },
            name_ar: { type: String},
        },
        country: {
            name_en: { type: String },
            name_ar: { type: String }
        },
        postalCode: Number,
    },
    customerAddress: {
        type: String
    },
    customerAddress_Elective: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('client', clientSchema)
