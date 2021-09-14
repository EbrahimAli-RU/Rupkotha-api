const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `Title is required`],
        unique: true
    },
    shortDescription: {
        type: String,
        required: [true, `Short Description is required`]
    }
})

const Category = mongoose.model('category', categorySchema)

module.exports = Category