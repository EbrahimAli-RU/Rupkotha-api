const Payment = require('../model/payment')
const Cupon = require('../model/cupon')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const mongoose = require('mongoose')

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'tinke6106e390efd96'
const store_passwd = 'tinke6106e390efd96@ssl'
const is_live = false



exports.payment = catchAsync(async (req, res, next) => {
    // const cupon = await Cupon.findOne({ cuponCode: req.body.usedCupon })
    // if (!cupon && req.body.usedCupon !== '') return next(new appError(`Cupon is Invalid`, 400))
    // let finalAmount = 0
    // if (cupon || req.body.usedCupon === '') {
    //     finalAmount = parseInt(req.body.tomalAmount) - ((parseInt(cupon.discountInPercent) * parseInt(req.body.tomalAmount)) / 100)
    // }
    // console.log(finalAmount)
    const data = {
        total_amount: parseInt(req.body.price),
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:8000/api/v1/payment/ssl-success',
        fail_url: 'http://localhost:3000/ssl-failure',
        cancel_url: 'http://localhost:3000/ssl-cancel',
        ipn_url: 'http://localhost:3000/ssl-ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        value_a: req.body.duration,
        value_b: req.body.usedCupon,
        value_c: req.user.id
    };

    const sslcommer = new SSLCommerzPayment(store_id, store_passwd, is_live) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        if (data?.GatewayPageURL) {
            res.status(200).json({
                status: 'success',
                data: {
                    url: data?.GatewayPageURL
                }
            })
        } else {
            return res.status(400).json({
                message: 'No redirect'
            })
        }
    });

})

exports.ssl_success = catchAsync(async (req, res, next) => {
    req.body.amount = req.body.amount
    req.body.currency = req.body.currency
    req.body.cardType = req.body.card_type
    req.body.usedCupon = req.body.value_b
    req.body.paymentBy = req.body.value_c
    req.body.paymentAt = Date.now()
    req.body.expireIn = Date.now() + parseInt(req.body.value_a * 30) * 1000 * 60 * 60 * 24
    const exist = await Payment.findOne({paymentBy: req.body.value_c})
    console.log('OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', exist)
    if(!exist) {
        const payment = await Payment.create(req.body)  
    } else {
        console.log('ELLLLSE GGGGGGGGGGGGGGGGGGGGGGGg')
        const gggg = await Payment.findByIdAndUpdate(exist._id , 
            {expireIn: req.body.expireIn, amount: req.body.amount}, {new: true, runValidators: true})
            console.log(gggg)
    }
    
    res.redirect('http://localhost:3000/home')
})
exports.ssl_failure = catchAsync(async (req, res, next) => {
    return res.status(200).json({
        data: req.body
    })
})
exports.ssl_cancel = catchAsync(async (req, res, next) => {
    return res.status(200).json({
        data: req.body
    })
})
exports.ssl_ipn = catchAsync(async (req, res, next) => {
    return res.status(200).json({
        data: req.body
    })
})
// "expireIn": { $gte: new Date().getTime() }
exports.getPaymentInfo = catchAsync(async (req, res, next) => {
    const payment = await Payment.findOne({ paymentBy: req.params.userId, })
    if(!payment) {
        return res.status(200).json({ status: 'success', data: { premiumUser: false, subscription: false } })
    }
    if (payment.expireIn > Date.now()) {
        return res.status(200).json({ status: 'success', data: { premiumUser: true, subscription: true, payment } })
    } else {
        return res.status(200).json({ status: 'success', data: { premiumUser: false, subscription: true } })
    }
})
