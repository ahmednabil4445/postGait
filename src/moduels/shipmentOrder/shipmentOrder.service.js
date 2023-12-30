const shipmentOrderModel = require('../../../databases/models/shipmentOrder.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const clientModel = require('../../../databases/models/client.model')
const productModel = require('../../../databases/models/product.model')
const storeModel = require('../../../databases/models/store.model')


module.exports.createshipmentOrder = catchAsyncError(async (req, res , next) => {
    let shipmentOrder = new shipmentOrderModel(req.body)
    let clientFound = await clientModel.findById(req.body.clientName)
    let productFound = await productModel.findById(req.body.product)
    let storeFound = await storeModel.findById(req.body.store)
    if (!clientFound) {
        return next(new AppError('Client Not Found', 409));
    }
    if (!storeFound) {
        return next(new AppError('Store Not Found', 409));
    }
    if (!productFound) {
        return next(new AppError('Product Not Found', 409));
    }
    await shipmentOrder.save();
    res.status(200).json({ message: 'Success', shipmentOrder })
})


module.exports.getAllShipmentOrders = catchAsyncError(async (req, res) => {
    let shipmentOrders = await shipmentOrderModel.find({})
    res.json({ message: 'this is All Shipment Orders', shipmentOrders })
})
module.exports.getSpecificShipmentOrder = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let shipmentOrder = await shipmentOrderModel.findById(id)
    res.json({ message: 'Success', shipmentOrder })
})

// module.exports.updateShipment = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Shipment = await shipmentModel.findByIdAndUpdate(id, req.body, { new: true });
//     if (!Shipment) {
//         return next(new AppError(`Shipment Not Found`, 404))
//     }
//     res.json({ message: 'Updated Shipment', Shipment })
// })

// module.exports.deleteShipment = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Shipment = await shipmentModel.findByIdAndDelete(id);
//     if (!Shipment) {
//         return next(new AppError(`Shipment Not Found`, 404))
//     }
//     res.json({ message: 'Deleted Shipment', Shipment })
// })

