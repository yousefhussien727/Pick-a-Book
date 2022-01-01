const mongoose = require('mongoose');

const accSchema = new mongoose.Schema({
    accountID: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: [String],
    },
    phoneNum: {
        type: [String],
    },
});

//Export Account Collection
module.exports = mongoose.model('Account', accSchema);