const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createShipment, updateShipment, getAllShipments, deleteShipment, getSpecificShipment, searchShipment } = require('./shipment.service')
app.route('/').post(protectedRoutes, createShipment).get(getAllShipments)
app.route('/searchShipment').get(searchShipment)
app.route('/:id').get(getSpecificShipment).delete(deleteShipment).put(updateShipment)

module.exports = app
