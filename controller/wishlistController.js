const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Wishlist = require('../model/wishlist')


exports.addToWishlist = catchAsync(async (req, res, next) => {
    if (!req.body.userId) req.body.userId = req.body.userId
    const isInWishlist = await Wishlist.findOneAndDelete({ bookId: req.body.bookId, userId: req.body.userId })
    if (isInWishlist) {
        res.status(200).json({
            status: 'success',
            data: {
                wishList: isInWishlist,
                message: 'deleted'
            }
        })
    } else {
        const wishList = await Wishlist.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                wishList,
                message: 'created'
            }
        })
    }

})


exports.getWishlist = catchAsync(async (req, res, next) => {
    const wishList = await Wishlist.find({ userId: req.params.userId }).populate({
        path: 'bookId',
        select: '_id cardPhoto category shortDescription'
    })
    res.status(200).json({
        status: 'success',
        data: {
            wishList
        }
    })
})

exports.removeFromWishList = catchAsync(async(req, res, next) => {
    const isInWishlist = await Wishlist.findOneAndDelete({ bookId: req.query.bookId, userId: req.query.userId })
    res.status(204).json({
        status: 'success'
    })

})