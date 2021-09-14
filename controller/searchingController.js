const multer = require("multer");
const sharp = require("sharp");

const Searching = require("../model/searching");
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

exports.searchingPhotos = upload.fields([{ name: "photos", maxCount: 20 }]);

const searchingPhotoUploader = async (req) => {
  console.log(req.files);
  console.log(req.body.topic_title[0]);
  req.body.search = [];
  await Promise.all(
    req.files.photos.map(async (el, i) => {
      const fileName = `search-${req.user.id}-${Date.now()}-${i}.jpeg`;
      await sharp(req.files.photos[i].buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/search/${fileName}`);

      req.body.search.push({
        photo: fileName,
        topic_title: req.body.topic_title[i],
      });
    })
  );
};

exports.resizeSearchingPhotos = catchAsync(async (req, res, next) => {
  if (!req.files.photos)
    return next(new appError("Please Upload Photos!", 400));
  await searchingPhotoUploader(req);
  next();
});

exports.addSearching = catchAsync(async (req, res, next) => {
  const search = await Searching.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      search,
    },
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  const search = await Searching.find();

  res.status(200).json({
    status: "success",
    data: {
      search,
    },
  });
});
