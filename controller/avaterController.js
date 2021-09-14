const multer = require("multer");
const sharp = require("sharp");

const Avater = require("../model/avater");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError(`Not an image! please upload an image`, 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

exports.avaterPhotos = upload.fields([{ name: "photos", maxCount: 20 }]);

const avaterPhotoUploader = async (req) => {
  req.body.photos = [];
  await Promise.all(
    req.files.photos.map(async (el, i) => {
      const fileName = `avaterPhoto-${req.user.id}-${Date.now()}-${i}.jpeg`;
      await sharp(req.files.photos[i].buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/avater/${fileName}`);

      req.body.photos.push(fileName);
    })
  );
};

exports.resizeAvaterPhotos = catchAsync(async (req, res, next) => {
  if (!req.files.photos)
    return next(new appError("Please Upload Photos!", 400));

  await avaterPhotoUploader(req);
  next();
});

exports.addAvater = catchAsync(async (req, res, next) => {
  const avater = await Avater.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      avater,
    },
  });
});

exports.getAvater = catchAsync(async (req, res, next) => {
  const avaters = await Avater.find();

  res.status(200).json({
    status: "success",
    data: {
      avaters,
    },
  });
});
