const mongoose = require('mongoose')

const bankAccountSchema = mongoose.Schema({
    beneficiaryName: {
        type: String
    },
    IBAN: {
        type: String
    },
    nameBank: {
        type: String
    }
}, { timestamps: true })



module.exports = mongoose.model('bankAccount', bankAccountSchema)