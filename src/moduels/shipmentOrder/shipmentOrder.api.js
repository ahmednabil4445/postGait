const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createshipmentOrder, getAllShipmentOrders, getSpecificShipmentOrder } = require('./shipmentOrder.service')
app.route('/').post(createshipmentOrder).get(getAllShipmentOrders)
app.route('/:id').get(getSpecificShipmentOrder)
// .delete(deleteShipment).put(updateShipment)

module.exports = app