const app = require('express').Router()
const { createPayment, createProcess } = require('./payment.service')
app.route('/').post( createPayment)
// app.route('/').post( createProcess)

module.exports = app