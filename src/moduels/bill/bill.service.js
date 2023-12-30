const billModel = require('../../../databases/models/bill.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createBills= catchAsyncError(async (req, res , next) => {
    let bill = new billModel(req.body) 
    await bill.save();
    res.status(200).json({ message: 'Success', bill })
})


module.exports.getAllbills = catchAsyncError(async (req, res) => {
    let bills = await billModel.find({})
    res.json({ message: 'Fetehed bills Succefully', bills })
})
module.exports.getSpecificBill = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let Bill = await billModel.findById(id)
    res.json({ message: 'Success', Bill })
})

module.exports.updateBill = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Bill = await billModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Bill) {
        return next(new AppError(`Bill Not Found`, 404))
    }
    res.json({ message: 'Updated Bill', Bill })
})

module.exports.deleteBill = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Bill = await billModel.findByIdAndDelete(id);
    if (!Bill) {
        return next(new AppError(`Bill Not Found`, 404))
    }
    res.json({ message: 'Deleted Bill', Bill })
})

