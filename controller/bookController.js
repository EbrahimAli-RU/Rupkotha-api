const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const Book = require('../model/book')

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

exports.bookPhotos = upload.fields([
    { name: 'backgroundPhoto', maxCount: 1 },
    { name: 'bookPhoto', maxCount: 1 },
    { name: 'cardPhoto', maxCount: 1 }
])

const bookPhotoUploader = async (req) => {
    req.body.backgroundPhoto = `backgroundPhoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.files.backgroundPhoto[0].buffer)
        .resize(800, 1920)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/book/${req.body.coverphoto}`);

    req.body.bookPhoto = `bookPhoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.files.bookPhoto[0].buffer)
        .resize(800, 1920)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/book/${req.body.bookPhoto}`);

    req.body.cardPhoto = `cardPhoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.files.cardPhoto[0].buffer)
        .resize(420, 280)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/book/${req.body.cardPhoto}`);
}

exports.resizeBookPhotos = catchAsync(async (req, res, next) => {
    if (!req.files.backgroundPhoto) return next(new appError('Please Upload Photos!', 400));

    await bookPhotoUploader(req)
    next();
})

exports.addBook = catchAsync(async(req, res, next) => {
    const book = await Book.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.getOneBook = catchAsync(async(req, res, next) => {
    const book = await Book.findById(req.params.bookId)
    let cannel
    if(book) {
        cannel = await Book.find({category: book.category[0]})
    }

    res.status(200).json({
        status: 'success',
        data: {
            book,
            cannel
        }
    })
})

exports.getAllBook = catchAsync(async(req, res, next) => {
    let book
    if((req.query.s * 1) === 0) {
        const categories = ['New release']
         book = await Book.aggregate([
            { $unwind: "$category"},
            { $match: {category: {$in: categories}}},
            { $group: { _id: "$category", books: { $push: {cardPhoto: "$cardPhoto", id: "$_id" } }, } },
        ])
    } else {
         book = await Book.aggregate([
            { $unwind: "$category"},
            { $group: { _id: "$category", books: { $push: {cardPhoto: "$cardPhoto", id: "$_id" } }, } }, 
        ]).skip((req.query.s * 1 - 1) * (req.query.l * 1)).limit(req.query.l * 1)
    }
    

    res.status(200).json({
        status: 'success',
        result: book.length,
        data: {
            book
        }
    })
})

