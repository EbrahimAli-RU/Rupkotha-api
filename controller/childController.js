const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Child = require('../model/child');
const User = require('../model/user')

const authController = require('./authController');

const signToken = id => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
}


exports.addChild = catchAsync(async(req, res, next) => {
    console.log(req.user)
    if(!req.body.parrent) req.body.parrent = req.user._id
    const child = await Child.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            child
        }
    })
})

exports.getOneChild = catchAsync(async(req, res, next) => {
    const child = await Child.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            child
        }
    })
})

exports.getAllChild = catchAsync(async(req, res, next) => {
    const child = await Child.find();

    res.status(200).json({
        status: 'success',
        result: child.length,
        data: {
            child
        }
    })
})


exports.createChild =async(req, res, next) => {
    if(!req.body.parrent) req.body.parrent = req.user._id
    try {
        const child = await Child.create(req.body);

        const cookieOption = {
            expiresIn: Date.now() + process.env.ACCESS_TOKEN_EXPIRE,
            secure: false,
            httpOnly: false
        }
        console.log(signToken(req.user._id))
        res.cookie('token', signToken(req.user._id), cookieOption )
      
        res.status(200).json({
            status: 'success',
            data: {
                user: req.user._id,
                child,
                token: signToken(req.user._id)
            }
        })
    } catch(err) {
        const user = await User.findByIdAndDelete(req.user._id);
        res.status(200).json({
            status: 'success',
            data: {
                message: "Something went wrong to Creating a Default User."
            }
        })
    }
}

exports.deleteChild = catchAsync(async(req, res, next) => {
    const child = await Child.findByIdAndDelete(req.params.childId)

    res.status(204).json({
        status: 'success',
        
    })
})