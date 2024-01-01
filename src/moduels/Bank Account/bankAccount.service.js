const bankAccountModel = require('../../../databases/models/bankAccounts.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createBankAccount= catchAsyncError(async (req, res , next) => {
    let BankAccount = new bankAccountModel(req.body) 
    await BankAccount.save();
    res.status(200).json({ message: 'Success', BankAccount })
})


module.exports.getAllBankAccounts = catchAsyncError(async (req, res) => {
    let BankAccounts = await bankAccountModel.find({})
    res.json({ message: 'Fetehed BankAccounts Succefully', BankAccounts })
})
module.exports.getSpecificBankAccount = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let BankAccount = await bankAccountModel.findById(id)
    res.json({ message: 'Success', BankAccount })
})

module.exports.updateBankAccount = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let BankAccount = await bankAccountModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!BankAccount) {
        return next(new AppError(`BankAccount Not Found`, 404))
    }
    res.json({ message: 'Updated BankAccount', BankAccount })
})

module.exports.deleteBankAccount = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let BankAccount = await bankAccountModel.findByIdAndDelete(id);
    if (!BankAccount) {
        return next(new AppError(`BankAccount Not Found`, 404))
    }
    res.json({ message: 'Deleted BankAccount', BankAccount })
})

