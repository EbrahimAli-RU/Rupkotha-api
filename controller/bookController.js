const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Book = require('../model/book')

exports.addBook = catchAsync(async(req, res, next) => {
    const book = await Book.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.getAllBook = catchAsync(async(req, res, next) => {
    const book = await Book.find()

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.getOneBook = catchAsync(async(req, res, next) => {
    const book = await Book.findById(req.params.bookId)

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})