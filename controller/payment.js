const bookSchema = require('../model/book');
const path = require('path');
const paypal = require('paypal-rest-sdk');

// Paypal API Config
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
});

// function displayBooksList(req, res, next) {
//     res.type('html');
//     res.sendFile(path.join(__dirname, '../view/index.html'));
// }
// function displayBookSearch(req, res, next) {
//     res.type('html');
//     res.sendFile(path.join(__dirname, '../view/search.html'));
// }
function displayPayment(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/payment.html'));
}

function makePayment(req, res, next) {
    console.log(req.body);

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/pay/completePayment",
            "cancel_url": "http://localhost:3000/pay/cancelPayment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "The fault in our stars",
                    "price": "270.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "270.00"
            },
            "description": "this book is very good"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}

function completePayment(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EGY",
                "total": "270.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Payment done succefully');
        }
    });
}

function cancelPayment(req, res, next) {
    res.send('payment method canceled');
}

module.exports = {
    displayPayment: displayPayment,
    makePayment: makePayment,
    completePayment: completePayment,
    cancelPayment: cancelPayment,
};