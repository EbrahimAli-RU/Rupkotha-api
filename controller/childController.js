const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Child = require('../model/child');


exports.createChild = catchAsync(async(req, res, next) => {
    const child = await Child.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user: req.newUser,
            child
        }
    })
})