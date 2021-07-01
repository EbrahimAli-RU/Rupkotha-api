const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Wishlist = require('../model/wishlist')


exports.addToWishlist = catchAsync(async(req, res, next) => {
    const isInWishlist = await Wishlist.findOneAndDelete({bookId:req.body.bookId, userId: req.body.userId})
    if(isInWishlist) {
        console.log("OK",isInWishlist._id)
        res.status(204).json({
            status: 'success',
            message: 'deleted'
        })
    } else {
        const wishList = await Wishlist.create(req.body)

        res.status(201).json({
            status: 'success',
            wishList
        })
    }
    
})


exports.getWishlist = catchAsync(async(req, res, next) => {
    const wishList = await Wishlist.find({userId: req.params.userId}).populate({
        path: 'bookId',
        select: '_id cardPhoto'
    })

    res.status(200).json({
        status: 'success',
        wishList
    })
})