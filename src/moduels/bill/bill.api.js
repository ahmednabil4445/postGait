const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createBills, getAllbills, getSpecificBill, deleteBill, updateBill } = require('./bill.service')
app.route('/').post(protectedRoutes, createBills).get(getAllbills)
app.route('/:id').get(getSpecificBill).delete(deleteBill).put(updateBill)

module.exports = app