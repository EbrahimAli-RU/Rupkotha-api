const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Child = require('../model/child');
const User = require('../model/user')

const authController = require('./authController');


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


exports.createChild =async(req, res, next) => {
    if(!req.body.parrent) req.body.parrent = req.user._id
    try {
        const child = await Child.create(req.body);
      
        res.status(200).json({
            status: 'success',
            data: {
                user: req.user,
                child
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