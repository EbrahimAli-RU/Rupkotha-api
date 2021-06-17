const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBook);
router.get('/:bookId', bookController.getOneBook)


module.exports = router