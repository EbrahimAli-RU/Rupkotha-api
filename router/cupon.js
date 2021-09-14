const express = require('express')
const router = express.Router()

const cuponController = require('../controller/cuponController')

router.route('/')
    .post(cuponController.addCupon)
    .get(cuponController.getAllCupon)

router.route('/:cuponId')
    .get(cuponController.getCupon)
    .patch(cuponController.updateCupon)
    .delete(cuponController.deleteCupon)


module.exports = router