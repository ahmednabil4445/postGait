const Joi = require('joi');
module.exports.schemaSingup = Joi.object({
    firstName: Joi.string().min(3).max(80).required(),
    lastName: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/).required(),
    // repassword: Joi.ref('password')
})
module.exports.schemaSignin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
})
