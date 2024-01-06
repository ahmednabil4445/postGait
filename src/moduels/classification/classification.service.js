const classificationModel = require('../../../databases/models/classification.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const ApiFeatuers = require('../../utils/ApiFeatuers')


module.exports.createClassification = catchAsyncError(async (req, res) => {
        let Classification = new classificationModel(req.body)
        await Classification.save();
        res.status(200).json({ message: 'Success', Classification })
})


module.exports.getAllClassifications = catchAsyncError(async (req, res) => {
    let Classifications = await classificationModel.find({})
    res.json({ message: 'this is All Classifications',Classifications })
})
module.exports.getSpecificClassification = catchAsyncError(async (req, res) => {
    const {id} = req.params
    let Classification = await classificationModel.findById(id)
    res.json({ message: 'Success',Classification })
})
module.exports.searchClassifications = catchAsyncError(async (req, res) => {
    let apiFeatuers = new ApiFeatuers(classificationModel.find(), req.query).search()
    let Classifications = await apiFeatuers.mongooseQuery
    res.json({ message: 'this is All Classifications', Classifications })
})
module.exports.updateClassification = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Classification = await classificationModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Classification) {
        return next(new AppError(`Classification Not Found`, 404))
    }
    res.json({ message: 'Updated Classification', Classification })
})

module.exports.deleteClassification = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Classification = await classificationModel.findByIdAndDelete(id);
    if (!Classification) {
        return next(new AppError(`Classification Not Found`, 404))
    }
    res.json({ message: 'Deleted Classification', Classification })
})

