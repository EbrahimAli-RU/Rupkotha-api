const express = require('express')
const router = express.Router()

const interestController = require('../controller/interestController')
const authController = require('../controller/authController');

router.post('/', authController.protected, interestController.interestPhoto, interestController.resizeInterestPhoto,  interestController.addInterest)
router.get('/', interestController.getAllInterest);


module.exports = router