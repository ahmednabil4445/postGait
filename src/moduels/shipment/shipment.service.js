const shipmentModel = require('../../../databases/models/shipment.model')
const productModel = require('../../../databases/models/product.model')

const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')

const ApiFeatuers = require('../../utils/ApiFeatuers')


module.exports.createShipment = catchAsyncError(async (req, res , next) => {
    let Shipment = new shipmentModel(req.body)
    
    const product = await productModel.findById(req.body.productName);
    if (!product) {
        return next(new AppError('Product Not Exists', 409));
    }
    Shipment.price =( product.price * Shipment.quantity)
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
module.exports.searchShipment = catchAsyncError(async (req, res) => {
    let apiFeatuers = new ApiFeatuers(shipmentModel.find(), req.query).search()
    let Shipment = await apiFeatuers.mongooseQuery
    res.json({ message: 'this is All Shipments', Shipment })
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

