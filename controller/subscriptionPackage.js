const SubscriptionPackage = require('../model/subscriptionPackage')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')

exports.addPackage = catchAsync(async (req, res, next) => {
    const package = await SubscriptionPackage.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            package
        }
    })
})

exports.updatePackage = catchAsync(async (req, res, next) => {
    const package = await SubscriptionPackage.findByIdAndUpdate(req.params.packageId, req.body,
        { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            package
        }
    })
})


exports.getPackage = catchAsync(async (req, res, next) => {
    const package = await SubscriptionPackage.findById(req.params.packageId)

    res.status(200).json({
        status: 'success',
        data: {
            package
        }
    })
})

exports.deletePackage = catchAsync(async (req, res, next) => {
    const package = await SubscriptionPackage.findByIdAndDelete(req.params.packageId)

    res.status(204).json({
        status: 'success',
        data: {
            package
        }
    })
})

exports.getAllPackage = catchAsync(async (req, res, next) => {
    const package = await SubscriptionPackage.find()

    res.status(200).json({
        status: 'success',
        data: {
            package
        }
    })
})