const paymentModel = require('../../../databases/models/payment.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const axios = require('axios');

module.exports.createPayment = catchAsyncError(async (req, res, next) => {
    const noonResponse = await axios.post('https://api.noonpayments.com/payment/v1/order', req.body, {
        headers: {
            Authorization: 'Key_Live cG9zdGdhaXQucG9zdGdhaXRhcHA6MTM0NjAyNjhjOWUyNDQyZjkzZTEzYzliMGNmYWE1NmU='
        }
    });
    
        const orderData = { ...req.body, ...noonResponse.data };
    const order = new paymentModel(orderData); 
    await order.save();

    res.status(200).json({ message: 'Order processed and saved successfully', order });
});










module.exports.createProcess = catchAsyncError(async (req, res, next) => {
    const noonResponse = await axios.post('https://api.noonpayments.com/payment/v1/order', req.body, {
        headers: {
            Authorization: 'Key_Live cG9zdGdhaXQucG9zdGdhaXRhcHA6MTM0NjAyNjhjOWUyNDQyZjkzZTEzYzliMGNmYWE1NmU='
        }
    });

    const orderData = { ...req.body, ...noonResponse.data };
    const order = new Order(orderData);
    await order.save();

    res.status(200).json({ message: 'Order processed and saved successfully', order });
})