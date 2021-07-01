const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'book',
        required: [true, 'bookId is required']
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'bookId is required']
    }
})


const Wishlist = mongoose.model('wishlist', wishlistSchema)

module.exports = Wishlist