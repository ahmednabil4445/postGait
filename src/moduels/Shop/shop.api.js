const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createShop, getAllShops, updateShop, deleteShop, getSpecificShop } = require('./shop.service')
app.route('/').post(protectedRoutes, createShop).get(getAllShops)
app.route('/:id').get(getSpecificShop).delete(deleteShop).put(updateShop)

module.exports = app