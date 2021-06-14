const express = require('express')
const router = express.Router()

const childController = require('../controller/childController');
const authController = require('../controller/authController');

router.route('/')
    .post(childController.createChild);
router.post('/add-child',authController.protected, childController.addChild)


module.exports = router