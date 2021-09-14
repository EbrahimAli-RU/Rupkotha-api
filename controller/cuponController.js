const Cupon = require('../model/cupon')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')

exports.addCupon = catchAsync(async (req, res, next) => {
    const cupon = await Cupon.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            cupon
        }
    })
})

exports.updateCupon = catchAsync(async (req, res, next) => {
    const cupon = await Cupon.findByIdAndUpdate(req.params.cuponId, req.body,
        { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            cupon
        }
    })
})


exports.getCupon = catchAsync(async (req, res, next) => {
    const cupon = await Cupon.findOne({
        cuponCode: req.params.cuponId,
        "acyivateDate": { $lte: new Date().getTime() },
        "expireDate": { $gte: new Date().getTime() }
    })
    if (!cupon) {
        return next(new appError(`This Cupon is Not Valid`, 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            cupon
        }
    })
})

exports.deleteCupon = catchAsync(async (req, res, next) => {
    const cupon = await Cupon.findByIdAndDelete(req.params.cuponId)

    res.status(204).json({
        status: 'success',
        data: {
            cupon
        }
    })
})

exports.getAllCupon = catchAsync(async (req, res, next) => {
    const cupon = await Cupon.find()

    res.status(200).json({
        status: 'success',
        data: {
            cupon
        }
    })
})