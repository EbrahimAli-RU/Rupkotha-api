const express = require('express')
const router = express.Router()

const paymentController = require('../controller/paymentController')
const authController = require('../controller/authController')


router.post('/init', authController.protected, paymentController.payment);
router.get('/premium-user/:userId', paymentController.getPaymentInfo)
router.post('/ssl-success', paymentController.ssl_success)
router.post('/ssl-failure', paymentController.ssl_failure)
router.post('/ssl-cancel', paymentController.ssl_cancel)
router.post('/ssl-ipn', paymentController.ssl_ipn)

module.exports = router