const mongoose = require('mongoose')

const classificationSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Main: {
        type: String,
        required: true
    }
   
}, { timestamps: true})



module.exports = mongoose.model('Classification', classificationSchema)