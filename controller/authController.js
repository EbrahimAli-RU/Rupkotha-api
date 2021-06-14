const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../model/user')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const sendMail = require('../utils/email')
const { dataValidity, validateEmail } = require('../utils/validity')
const { promisify } = require('util')


const signToken = id => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
}


exports.register = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
        return next(new appError('This email is already exist! Please use another one.', 400))
    }
    const newUser = await User.create(req.body)
    
    if(newUser) {
        req.user = newUser
        next();
    } else {
        res.status(400).json({
            status: 'fail',
            data: {
                message: 'Some went wrong to Creating Your acconut!! Please try again'
            }
        })
    }
    
})

exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new appError(`Please provide email and password`, 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new appError(`Invalid email or password`))
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user._id,
            token: signToken(user._id)
        },
        message: `Logged in Successfully!`
    })
})

exports.protected = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    
    if (!token) {
        return next(new appError(`You are not logged in! please login.`, 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    console.log(decoded.id)
    const loggedInUser = await User.findById(decoded.id)
    if (!loggedInUser) {
        return next(new appError('The user belonging to this token does not exist', 401))
    }
    if (await loggedInUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError(`You have recently changed your password, please log in again`, 401));
    }

    req.user = loggedInUser
    next()
})


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return next(new appError(`No user with this email`, 404))
    }
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    const forgotPasswordUrl = `${process.env.CLIENT_URL}/user/forgotPassword/${resetToken}`
    try {
        await sendMail({
            to: email,
            subject: `Reset your password`,
            txt: `Reset Password`,
            url: forgotPasswordUrl
        })

        res.status(200).json({
            status: 'success',
            message: `E-Mail send to to ${email}`
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new appError(`There is an error sending email, please try again later`, 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { resetToken, password, confirmPassword } = req.body
    const resethashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({ passwordResetToken: resethashedToken, passwordResetExpire: { $gt: Date.now() } });
    if (!user) {
        return next(new appError(`Token is invalid or expired`, 400))
    }
    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            token: signToken(user._id)
        }
    })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, password, confirmPassword } = req.body
    const user = await User.findById(req.user.id).select('+password')
    if (!(await user.checkPassword(currentPassword, user.password))) {
        return next(new appError(`Your current password is not valid`, 401))
    }
    user.password = password
    user.confirmPassword = confirmPassword
    await user.save()
    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            token: signToken(user._id)
        }

    })

})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};

exports.getUser = catchAsync(async (req, res, next) => {
    const users = await User.findOne({_id: req.params.userId}).populate({
        path: 'children',
        select: ['name']
    })
    res.status(200).json({
        status: 'success',
        users
    })
})

exports.deleteUser =async userId => {
    console.log("KJHGFDSDFGHJ")
     async (req, res, next) => {
        const user = await User.findByIdAndDelete(userId);
        console.log('INSIDE DELETE USER!!!!!!!!');
        console.log(user);
        next();
    };
}


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        status: 'success',
        users
    })
})