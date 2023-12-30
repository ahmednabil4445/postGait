const shopModel = require('../../../databases/models/shop.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createShop = catchAsyncError(async (req, res,next) => {
    const{nameShop}=req.body
    const ShopExist = await shopModel.findOne({nameShop});
    if (ShopExist) {
        return next(new AppError('Shop Already Exists', 409));
    }
    let shop = new shopModel(req.body)
    await shop.save();
    res.status(200).json({ message: 'Success', shop })
})


module.exports.getAllShops = catchAsyncError(async (req, res) => {
    let shops = await shopModel.find({})
    res.json({ message: 'this is All shops', shops })
})
module.exports.getSpecificShop = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let shop = await shopModel.findById(id)
    res.json({ message: 'Success', shop })
})

module.exports.updateShop = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let shop = await shopModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!shop) {
        return next(new AppError(`shop Not Found`, 404))
    }
    res.json({ message: 'Updated shop', shop })
})

module.exports.deleteShop = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let shop = await shopModel.findByIdAndDelete(id);
    if (!shop) {
        return next(new AppError(`shop Not Found`, 404))
    }
    res.json({ message: 'Deleted shop', shop })
})

