const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs')

const Page = require('../model/page');
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('audio')) {
        cb(null, true)
    } else {
        cb(new appError(`Not an image! please upload an image`, 400), false)
    }
}

const upload = multer({
    storage,
    fileFilter: multerFilter
})

exports.pagePhotos = upload.fields([{
    name: 'audio', maxCount: 1
}, {
    name: 'page', maxCount: 1
}])


const pagePhotoUploader = async (req) => {
    console.log(req.files)
    req.body.page = `page-${req.body.pageNumber}.jpeg`
    await sharp(req.files.page[0].buffer)
        //.resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/audio/${req.body.page}`);

    req.body.audio = `audio-${req.body.pageNumber}`
    fs.writeFileSync(`public/audio/${req.body.audio}`, req.files.audio[0].buffer);
    // await sharp(req.files.audio[0].buffer)
    //     //     //.resize(600, 600)
    //     //     // .toFormat('mp3')
    //     //     // .jpeg({ quality: 90 })
    //     .toFile(`public/audio/${req.body.audio}`);
    console.log(req.body.pageNumber)
}


exports.resizepagePhotos = catchAsync(async (req, res, next) => {

    if (!req.files.page) return next(new appError('Please Upload Photos!', 400));

    await pagePhotoUploader(req)
    next();
})

exports.addPages = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const page = await Page.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            page
        }
    })
})

exports.getPages = catchAsync(async (req, res, next) => {
    const pages = await Page.find({ bookId: req.params.bookId });

    res.status(200).json({
        status: 'success',
        data: {
            pages
        }
    })
})