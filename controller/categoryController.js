const Category = require('../model/category')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')

exports.addCategory = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    })
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body,
        { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
})


exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.categoryId)

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
})

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.categoryId)

    res.status(204).json({
        status: 'success',
        data: {
            category
        }
    })
})

exports.getAllCategory = catchAsync(async (req, res, next) => {
    const category = await Category.find()

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
})