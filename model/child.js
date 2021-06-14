const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    profileImg: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        default: 'default'  
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        default: 5
    },
    language: {
        type: String,
        default: 'english'
    },
    parrent: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Parrent is required'],
    },
    interest: [String]
}, {timestamps: true})


const Child = mongoose.model('child', childSchema);

module.exports = Child