const productModel = require('../../../databases/models/product.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const cloudinary = require('cloudinary')

// **********************************************
cloudinary.v2.config({
    cloud_name: 'dofg9wmp0',
    api_key: '663141422279326',
    api_secret: 'R5M35Mx_R9MbiRp2yP_XSuSa3_Y',
    secure: true,
});
// **********************************************

module.exports.createProduct = catchAsyncError(async (req, res) => {
    if (req.file && req.file.path) {
        cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Cloudinary upload failed' });
            }
            req.body.image = result.secure_url;
            req.body.nameStore = req.body.nameStore || '';
            let Product = new productModel(req.body);
            await Product.save();
            return res.status(200).json({ message: 'Success', Product });
        });
    } else {
        return res.status(400).json({ error: 'File path not provided' });
    }
});

// *****************************************************



module.exports.getAllProducts = catchAsyncError(async (req, res) => {
    let Products = await productModel.find({})
    res.json({ message: 'this is All Products', Products })
})
module.exports.getSpecificProduct = catchAsyncError(async (req, res) => {
    const { id } = req.params
    let Product = await productModel.findById(id)
    res.json({ message: 'Success', Product })
})

module.exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404))
    }
    res.json({ message: 'Updated Product', Product })
})

module.exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Product = await productModel.findByIdAndDelete(id);
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404))
    }
    res.json({ message: 'Deleted Product', Product })
})

