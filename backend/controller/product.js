const Product = require('../model/products');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getSingleProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error("Error in getSingleProduct:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(400).json({ error: 'Invalid request' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};



module.exports = { getProducts, getSingleProduct, deleteProduct, createProduct  };
