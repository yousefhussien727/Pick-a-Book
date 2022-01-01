const express = require('express');
const bookController = require('../controller/book.js');
const paymentController = require('../controller/payment.js');
const userController = require('../controller/user.js');

const backendRouter = express.Router();
const frontendRouter = express.Router();

backendRouter
    // Book
    .post('/getBookbyID', bookController.getBookbyID)
    .post('/getBookbyTitle', bookController.getBookbyTitle)
    .post('/getAllBooks', bookController.getAllBooks)
    .post('/addBook', bookController.addBook)
    // Payment
    .post('/makePayment', paymentController.makePayment)
    .get('/completePayment', paymentController.completePayment)
    .get('/cancelPayment', paymentController.cancelPayment)
    // SignIn/SignUp
    .get('/getUser', userController.getUser)
    .put('/updateUser', userController.updateUser)
    .delete('/deleteUser', userController.deleteUser)
    .get('/getUsers', userController.getUsers)
    .post('/createUser', userController.createUser)


frontendRouter
    // Book
    .get('/', bookController.bookslist)
    .get('/book', bookController.bookPage)
    .get('/search', bookController.bookSearch)
    // Payment
    .get('/payment', paymentController.displayPayment)
    // SignIn/SignUp
    .get('/signin', userController.displaySignIn);


module.exports = {
    backend_router: backendRouter,
    frontend_router: frontendRouter
};