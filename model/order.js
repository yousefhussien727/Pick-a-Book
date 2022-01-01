const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    buyerID: {
        type: String,
        required: true,
    },
    sellerID: {
        type: String,
        required: true,
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        default: "No Order Details",
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    DateTime: {
        type: Date,
        default: Date.now,
    },
});

//Export Order Collection
module.exports = mongoose.model('Order', orderSchema);