const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true,
        unique: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sellerID: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        default: "No Description Available",
    },
    author: {
        type: [String],
        required: true,
    },
    condition: {
        type: String,
        default: "Condition not Specified",
    },
    rating: {
        type: String,
    },
    image_url: {
        type: String,
        default: "No Image",
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    create_date: {
        type: Date,
        default: Date.now,
    }
});

//Export Book Collection
module.exports = mongoose.model('Book', bookSchema);