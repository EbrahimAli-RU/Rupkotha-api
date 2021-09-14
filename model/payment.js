const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    paymentBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, `Payment Id id Required`]
    },
    paymentAt: {
        type: Date,
        required: [true, `Payment Time Id id Required`],
        default: Date.now()
    },
    expireIn: {
        type: Date,
        required: [true, `Expire Time is Required`],
    },
    usedCupon: {
        type: String,
    },
    amount: {
        type: Number,
        required: [true, `Price is Required`]
    },
    currency: {
        type: String,
    },
    cardType: {
        type: String
    }
})

const Payment = mongoose.model('payment', paymentSchema)

module.exports = Payment