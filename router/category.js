const express = require('express')
const router = express.Router()

const categoryController = require('../controller/categoryController')

router.route('/')
    .post(categoryController.addCategory)
    .get(categoryController.getAllCategory)

router.route('/:categoryId')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


module.exports = router