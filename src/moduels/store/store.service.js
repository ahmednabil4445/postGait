const storeModel = require('../../../databases/models/store.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createStore= catchAsyncError(async (req, res , next) => {
    let store = new storeModel(req.body) 
    await store.save();
    res.status(200).json({ message: 'Success', store })
})


module.exports.getAllStores = catchAsyncError(async (req, res) => {
    let stores = await storeModel.find({})
    res.json({ message: 'Fetehed Stores Succefully', stores })
})
module.exports.getSpecificStore = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let Store = await storeModel.findById(id)
    res.json({ message: 'Success', Store })
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

