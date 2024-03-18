const mongoose = require('mongoose');

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    
    imageUrl: {
        type: String,
        required: true
    },
    active: Boolean
});

module.exports = mongoose.model('Product',Product);
