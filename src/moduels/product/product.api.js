const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')

const { protectedRoutes } = require('../auth/auth.service')
const { createProduct, getAllProducts, updateProduct, getSpecificProduct, deleteProduct } = require('./product.service')
app.route('/').post(protectedRoutes,uploadSingleImage('image' , 'product'), createProduct).get(getAllProducts)
app.route('/:id').get(getSpecificProduct).delete(deleteProduct).put(updateProduct)

module.exports = app