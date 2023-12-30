const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { createCompany, getAllCompanies } = require('./company.service')
app.route('/').post(protectedRoutes, createCompany).get(getAllCompanies)

module.exports = app