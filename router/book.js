const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')
const authController = require('../controller/authController')

router.post('/', authController.protected, bookController.bookPhotos, bookController.resizeBookPhotos, bookController.addBook);
router.get('/', bookController.getAllBook);
router.get('/carosul', bookController.getCarosulData)
router.get('/channel', bookController.getBookByChannel)
router.get('/:BookId/read', bookController.getBookPages)
router.get('/:bookId', bookController.getOneBook)
router.delete('/:bookId', bookController.deleteBook)



module.exports = router