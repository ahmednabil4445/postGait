const companyModel = require('../../../databases/models/company.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createCompany = catchAsyncError(async (req, res) => {
        let company = new companyModel(req.body)
        await company.save();
        res.status(200).json({ message: 'Success', company })
})


module.exports.getAllCompanies = catchAsyncError(async (req, res) => {
    let Companies = await companyModel.find({})
    res.json({ message: 'this is All Companies',Companies })
})
