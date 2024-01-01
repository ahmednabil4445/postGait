const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createBankAccount, getAllBankAccounts, updateBankAccount, deleteBankAccount, getSpecificBankAccount } = require('./bankAccount.service')
app.route('/').post(protectedRoutes, createBankAccount).get(getAllBankAccounts)
app.route('/:id').get(getSpecificBankAccount).delete(deleteBankAccount).put(updateBankAccount)

module.exports = app