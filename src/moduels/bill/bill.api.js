const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createBills, getAllbills, getSpecificBill, deleteBill, updateBill, searchBills } = require('./bill.service')
app.route('/').post(protectedRoutes, createBills).get(getAllbills)
app.route('/searchBills').get(searchBills)
app.route('/:id').get(getSpecificBill).delete(deleteBill).put(updateBill)

module.exports = app
