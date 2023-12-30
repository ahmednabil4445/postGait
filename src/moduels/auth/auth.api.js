const app = require('express').Router()
const { signup, signin, verifyCode } = require('./auth.service')
const {validationSchema} = require('../../middleware/validation')
const { schemaSingup } = require('../user/user.validation')
app.route('/signup').post(validationSchema(schemaSingup),signup)
app.route('/signin').post(signin)
app.route('/verifyCode').post(verifyCode)

module.exports = app