const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: false
    },
    length: {
        type: String,
        required: [true, 'length required'],
    },
    weight: {
        type: String,
        required: [true, 'weight required'],
    },
    height: {
        type: String,
        required: [true, 'height required'],
    },
    width: {
        type: String,
        required: [true, 'width required'],
    },
    price: {
        type: Number,
        required: [true, 'price required'],
    },
    quantity: {
        type: Number,
        default: 0,
    },
    Classification: {
        type: String,
        required: true
    },
    image:String

}, { timestamps: true })



module.exports = mongoose.model('product', productSchema)