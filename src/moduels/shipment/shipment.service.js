const shipmentModel = require('../../../databases/models/shipment.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const clientModel = require('../../../databases/models/client.model')
const productModel = require('../../../databases/models/product.model')


module.exports.createShipment = catchAsyncError(async (req, res , next) => {
    let Shipment = new shipmentModel(req.body)
    let clientFound = await clientModel.findById(req.body.clientName)
    let productFound = await productModel.findById(req.body.product)
    if (!clientFound) {
        return next(new AppError('Client Not Found', 409));
    }
    if (!productFound) {
        return next(new AppError('Product Not Found', 409));
    }
    await Shipment.save();
    res.status(200).json({ message: 'Success', Shipment })
})


module.exports.getAllShipments = catchAsyncError(async (req, res) => {
    let Shipments = await shipmentModel.find({})
    res.json({ message: 'this is All Shipments', Shipments })
})
module.exports.getSpecificShipment = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let Shipment = await shipmentModel.findById(id)
    res.json({ message: 'Success', Shipment })
})

module.exports.updateShipment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Shipment = await shipmentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Shipment) {
        return next(new AppError(`Shipment Not Found`, 404))
    }
    res.json({ message: 'Updated Shipment', Shipment })
})

module.exports.deleteShipment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Shipment = await shipmentModel.findByIdAndDelete(id);
    if (!Shipment) {
        return next(new AppError(`Shipment Not Found`, 404))
    }
    res.json({ message: 'Deleted Shipment', Shipment })
})

