const express = require('express')
const router = express.Router()

const authController = require('../controller/authController')
const childController = require('../controller/childController');

router.route('/register').post(authController.register, childController.createChild);
router.post('/signin', authController.signIn);
router.post('/forgotpassword', authController.forgotPassword)
router.patch('/resetpassword', authController.resetPassword)
router.patch('/updatepassword', authController.protected, authController.updatePassword)
router.get('/', authController.getAllUsers)

/////////////////////////
router.delete('/:userId', authController.deleteUser)
router.get('/:userId', authController.getUser)

module.exports = router