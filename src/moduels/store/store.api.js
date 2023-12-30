const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { getAllStores, createStore, getSpecificStore } = require('./store.service')
app.route('/').post(protectedRoutes, createStore).get(getAllStores)
app.route('/:id').get(getSpecificStore)
// .delete(deleteShipment).put(updateShipment)

module.exports = app