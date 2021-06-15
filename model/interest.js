const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Interest title is required']
    },
    photo: {
        type: String
    }
})

const Interest = mongoose.model('interest', interestSchema);

module.exports = Interest