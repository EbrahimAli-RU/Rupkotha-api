const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Wishlist = require('../model/wishlist')


exports.addToWishlist = catchAsync(async(req, res, next) => {
    console.log(req.body)
    const isInWishlist = await Wishlist.findOneAndDelete({bookId:req.body.bookId, userId: req.body.userId})
    if(isInWishlist) {
        console.log("OK",isInWishlist._id)
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


exports.getWishlist = catchAsync(async(req, res, next) => {
    const wishList = await Wishlist.find({userId: req.params.userId}).populate({
        path: 'bookId',
        select: '_id cardPhoto category'
    })

    res.status(200).json({
        status: 'success',
        data: {
            wishList
        }
    })
})