const mongoose = require('mongoose')

const avaterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photos:[String]
})

const Avater = mongoose.model('avater', avaterSchema)

module.exports = Avater