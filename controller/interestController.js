const multer = require('multer');
const sharp = require('sharp');

const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Interest = require('../model/interest')

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new appError(`Not an image! please upload an image`, 400), false)
    }
}

const upload = multer({
    storage,
    fileFilter: multerFilter
})

exports.interestPhoto = upload.single('photo')

const interestPhotoUploader = async (req) => {

    const fileName = `avaterPhoto-${req.user.id}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/interest/${fileName}`);
            req.body.photo = fileName
}

exports.resizeInterestPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new appError('Please Upload Photos!', 400));

    await interestPhotoUploader(req)
    next();
})

exports.addInterest = catchAsync(async(req, res, next) => {
    const interest = await Interest.create(req.body)

    res.status(201).json({
        status: 'success',
        data: [
            interest
        ]
    })
})

exports.getAllInterest = catchAsync(async(req, res, next) => {
    const interest = await Interest.find()

    res.status(200).json({
        status: 'success',
        data: [
            interest
        ]
    })
})