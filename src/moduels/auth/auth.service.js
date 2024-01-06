const userModel = require('../../../databases/models/user.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Taqnyat = require('./taqnyat'); 

function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000); 
  }
  

module.exports.signup = async (req, res, next) => {
    const { firstName, lastName, email, password, phone, clientAddress } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return next(new AppError('Email already exists', 409));
    }
    const verificationCode = generateVerificationCode();
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password,
        phone,
        clientAddress,
        verificationCode, 
      });
      await newUser.save();
      const taqnyatClient = new Taqnyat.Taqnyat('107a4320b038638375f83ea7deb99b3d', 'Postgait-AD');
      const message = `Your verification code is: ${verificationCode}`;
      const recipients = [phone];
      try {
        await taqnyatClient.sendSMS(message, recipients);
        res.status(200).json({ message: 'Signup Success', user: newUser });
      } catch (error) {
        return next(new AppError('Failed to send verification code', 500));
      }
}
const { myEmail } = require('../../utils/emails')
module.exports.verifyCode = async (req, res, next) => {
    const { verificationCode,email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || user.verificationCode !== verificationCode) {
      return next(new AppError('Invalid verification code', 400));
    }
    user.isVerified = true;
    res.status(200).json({ message: 'Verification successful' });
}


// module.exports.signup = async (req, res, next) => {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) next(new AppError('E-mail Aleardy Exist', 409))
//     const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
//     let User = new userModel({ ...req.body, code: accessCode })
//     await User.save();
//     await myEmail(req.body.email, `<h1>Access code: ${accessCode}</h1>`);
//     res.status(200).json({ message: 'Signup Success', User })
// }

module.exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
                let token = jwt.sign({ name: user.name, role: user.role, email: user.email, userId: user._id }, 'SKEY')
                res.json({ message: "Success Signin", token })
        } else {
            res.json({ message: 'password in-correct' })
        }
    } else {
        res.status(409).json({ message: 'E-mail Not Registered' })
    }
}


exports.logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});
module.exports.protectedRoutes = async (req, res, next) => {
    let { token } = req.headers;

    if (!token) return next(new AppError('Token Not Provided', 401))
    let decoded = await jwt.verify(token, 'SKEY');

    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError('In-valid Token', 401))

    if (user.passwordChangedAt) {
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (changePasswordDate > decoded.iat) return next(new AppError('In-valid Token', 401))
    }
    req.user = user
    next()
}



module.exports.allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('Your are not autherized this route , You are ' + req.user.role, 401))
        next()
    })
}

exports.sendCode = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).json({ message: "E-mail Not Exist" })
    } else {
        const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.code = accessCode
        await user.save();
        myEmail(user.email, `<h1>access code : ${accessCode} </h1>`)
        res.json({ message: "Code Send Succefully" })
    }
});
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const { email, code, password } = req.body;
    if (!code) {
        res.status(401).json({ message: " Account dosn't require forget password yet" })
    } else {
        let user = await userModel.findOne({ email, code });
        if (!user) {
            res.status(401).json({ message: "In-correct E-mail Or Code" })
        } else {
            // const hashPassword = await bcrypt.hash(password, 8)
            await userModel.updateOne({ _id: user._id }, { code: code, password })
            let token = jwt.sign({
                name: user.name,
                userId: user._id
            }, process.env.JWT_KEY);
            res.json({ message: "Done", user, token })
        }
    }
});
