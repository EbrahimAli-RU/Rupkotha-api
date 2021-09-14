const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, `Price is required`],
    },
    duration: {
        type: String,
        required: [true, `Package duration is required`]
    },
    color: {
        type: String,
        required: [true, `Color is required`]
    },
    time: {
        type: Number,
        required: [true, `Time is required`]
    }
})

const Package = mongoose.model('subscriptionPackages', packageSchema)

module.exports = Package