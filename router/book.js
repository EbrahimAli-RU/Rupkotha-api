const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')
const authController = require('../controller/authController')

router.post('/', authController.protected, bookController.bookPhotos, bookController.resizeBookPhotos, bookController.addBook);
router.get('/', bookController.getAllBook);
router.get('/:bookId', bookController.getOneBook)


module.exports = router