const express = require('express');
const { getCartByUserId, addToCart, removeFromCart, createCart } = require('../controller/cart');
const router = express.Router();


// create cart
router.post('/createCart/:username',createCart)


// Get cart by user ID
router.get('/:userId', getCartByUserId);

// Add product to cart
router.post('/add', addToCart);


// Remove product from cart
router.delete('/:userId/:productId',removeFromCart);

module.exports = router;
