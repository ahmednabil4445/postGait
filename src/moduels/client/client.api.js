const app = require('express').Router()
const { validationSchema } = require('../../middleware/validation')
const { createClient, getAllClients, updateClient, deleteClient, getClient, getAllCities, cities, searchClient } = require('./client.service')
const { schemaCreateClient } = require('./client.validation')
app.route('/').post(validationSchema(schemaCreateClient), createClient).get(getAllClients)
app.route('/cities').get(cities)
app.route('/searchClient').get(searchClient)
app.route('/:id').get(getClient).delete(deleteClient).put(updateClient)

module.exports = app