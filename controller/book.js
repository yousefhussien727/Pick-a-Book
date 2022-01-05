const bookSchema = require('../model/book');
const path = require('path');

function displayBooksList(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/index.html'));
}
function displayBookSearch(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/search.html'));
}
function displayBookPage(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/preview.html'));
}

function getBookbyID(req, res, next) {
    bookSchema
        .find({
            bookID: req.body.bookID,
        })
        .then(retrievedBook => {
            //console.log('Book Retrieved: ' + retrievedBook);
            return res.json({
                success: true,
                message: "Book Retreived from Database Successfully",
                book: retrievedBook,
            });
        })
        .catch(err => {
            // console.log('Database Error: ' + err);
            return res.json({ success: false, message: 'Database Error: ' + err });
        });
}

function getBookbyTitle(req, res, next) {
    bookSchema
        .find({
            title: req.body.title,
        })
        .then(retrievedBook => {
            //console.log('Book Retrieved: ' + retrievedBook);
            return res.json({
                success: true,
                message: "Book Retreived from Database Successfully",
                book: retrievedBook,
            });
        })
        .catch(err => {
            // console.log('Database Error: ' + err);
            return res.json({ success: false, message: 'Database Error: ' + err });
        })
}

function getAllBooks(req, res, next) {
    bookSchema
        .find({})
        .then(retrievedBooks => {
            return res.json({
                success: true,
                message: "All Books Retreived from Database Successfully",
                books: retrievedBooks,
            });
        })
        .catch(err => {
            return res.json({ success: false, message: 'Database Error: ' + err });
        })
}

function addBook(req, res, next) {
    // For Testing
    // const data = {
    //     bookID: "1000",
    //     isbn: "0470484705",
    //     title: "Cloud Computing For Dummies",
    //     genre: ["Technology", "Computer Science"],
    //     description: "The easy way to understand and implement cloud computing technology written by a team of experts.",
    //     author: ["Judith Hurwitz", "Robin Bloor", "Marcia Kaufman", "Fern Halper"],
    //     condition: "New",
    //     rating: "3.41",
    //     image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348235980l/6485971.jpg",
    //     price: 34.99,
    // };

    const data = req.body;

    new bookSchema(data).save()
        .then(book => {
            console.log('A New Book is added: ' + book);
            return res.json({ success: true, message: 'A New Book is added: ' + book });
        })
        .catch(err => {
            console.log('Database Error: ' + err);
            return res.json({ success: false, message: 'Database Error: ' + err });
        })
}

module.exports = {
    bookslist: displayBooksList,
    bookPage: displayBookPage,
    bookSearch: displayBookSearch,
    getBookbyID: getBookbyID,
    getBookbyTitle: getBookbyTitle,
    getAllBooks: getAllBooks,
    addBook: addBook,
};