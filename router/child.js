const express = require('express')
const router = express.Router()

const childController = require('../controller/childController');
const authController = require('../controller/authController');

router.route('/')
    .post(childController.createChild);
router.get('/:id', childController.getOneChild)
router.get('/', childController.getAllChild)
router.post('/add-child',authController.protected, childController.addChild)
router.patch('/:childId', childController.updateChild)
router.delete('/:childId', childController.deleteChild)


module.exports = router