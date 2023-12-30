const Joi = require('joi');
module.exports.schemaCreateClient = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
  
    phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/).required(),
    // repassword: Joi.ref('password')
    customerAddressDetails: Joi.object().keys({
        country:Joi.object().keys({name_en: Joi.string(),name_ar: Joi.string()}).required(),
        cities:Joi.object().keys({name_en: Joi.string(),name_ar: Joi.string()}),
        postalCode: Joi.number().required(),
    }),
    customerAddress:Joi.string().required(),
    customerAddress_Elective:Joi.string().required(),
})

