const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    backgroundPhoto: {
        type: String,
        required: [true, 'Background photo is required']
    },
    bookPhoto : {
        type: String,
        required: [true, 'Book  photo is required']
    },
    cardPhoto: {
        type: String,
        required: [true, 'Card  photo is required']
    },
    bookTitle: {
        type: String
    },
    shortDescription: {
        type: String
    },
    timeToRead: {
        type: String
    },
    category: [{
        type: String
    }],
    longDescription: {
        type: String
    },
    inCarosul: {
        type: Boolean
    }
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book
