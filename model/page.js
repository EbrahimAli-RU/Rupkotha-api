const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    // pages: [
    //     {
    //         type: String,
    //         required: [true, `Page is required`]
    //     }
    // ],
    page: {
        type: String,
    },
    pageNumber: {
        type: Number,
        min: 1
    },
    audio: {
        type: String,
    },
    bookId: {
        type: mongoose.Schema.ObjectId
    }

})

const Page = mongoose.model('page', pageSchema);
module.exports = Page