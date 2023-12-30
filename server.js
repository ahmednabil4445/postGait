const express = require('express')
const { dbConnection } = require('./databases/dbConnection')
require('dotenv').config()
var morgan = require('morgan')
const AppError = require('./src/utils/AppError')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))
const cors = require('cors');
app.use(cors())
// *******************************************************************

app.use('/api/v1/users', require('./src/moduels/user/user.api'))
app.use('/api/v1/clients', require('./src/moduels/client/client.api'))
app.use('/api/v1/auth', require('./src/moduels/auth/auth.api'))
app.use('/api/v1/shops', require('./src/moduels/Shop/shop.api'))
app.use('/api/v1/shipments', require('./src/moduels/shipment/shipment.api'))
app.use('/api/v1/products', require('./src/moduels/product/product.api'))
app.use('/api/v1/companies', require('./src/moduels/company/company.api'))
app.use('/api/v1/classifications', require('./src/moduels/classification/classification.api'))
app.use('/api/v1/stores', require('./src/moduels/store/store.api'))
app.use('/api/v1/shipmentOrders', require('./src/moduels/shipmentOrder/shipmentOrder.api'))
app.use('/api/v1/Payments', require('./src/moduels/payment/payment.api'))
app.use('/api/v1/bills', require('./src/moduels/bill/bill.api'))



app.all('*', (req, res, next) => {
    // res.json({message:`Can't find this route : ${req.originalUrl}` })
    next(new AppError(`Can't find this route : ${req.originalUrl} on server`, 404))
})
// *******************************************************************

// ******************** global error handling middleware ************
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ Error: err.message, statusCode })
})
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
      console.log('unhandledRejection', err);
})