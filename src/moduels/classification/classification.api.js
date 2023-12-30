const app = require('express').Router()
const { protectedRoutes } = require('../auth/auth.service')
const { getAllClassifications, updateClassification, deleteClassification, createClassification, getSpecificClassification } = require('./classification.service')
app.route('/').post(protectedRoutes, createClassification).get(getAllClassifications)
app.route('/:id').get(getSpecificClassification).delete(deleteClassification).put(updateClassification)

module.exports = app