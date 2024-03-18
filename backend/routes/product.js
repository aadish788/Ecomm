const express = require('express'); // Require express module
const { getProducts, getSingleProduct, createProduct, deleteProduct, searchProducts } = require('../controller/product'); // Require controller functions
const router = express.Router(); // Create an instance of Express Router

// GET products
router.get('/getProducts', getProducts);

// GET single product
router.get('/:productId', getSingleProduct);

// POST to create product
router.post('/getProducts', createProduct);

// DELETE product
router.delete('/:productId', deleteProduct);


module.exports = router; // Export router to be used by other parts of the application
