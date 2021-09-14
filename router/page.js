const express = require('express')
const router = express.Router()


const pageController = require('../controller/pageController')
const authController = require('../controller/authController')
// router.post('/', pageController.ghjk, pageController.uploadSinglePage)

router.post('/', pageController.pagePhotos, pageController.resizepagePhotos, pageController.addPages);
router.get('/:bookId', pageController.getPages);
module.exports = router