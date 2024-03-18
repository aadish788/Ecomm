const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', Cart);