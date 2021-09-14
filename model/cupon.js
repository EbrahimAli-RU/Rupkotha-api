const mongoose = require('mongoose')

const cuponSchema = new mongoose.Schema({
    cuponCode: {
        type: String,
        required: [true, `Cupon Code is required`],
        unique: true
    },
    acyivateDate: {
        type: Date,
        required: [true, `Activate date is required`],
    },
    expireDate: {
        type: Date,
        required: [true, `Expire date is required`],
    },
    discountInPercent: {
        type: Number,
        required: [true, `Discount is required`],
        min: 0
    }
})

const Cupon = mongoose.model('cupon', cuponSchema)

module.exports = Cupon