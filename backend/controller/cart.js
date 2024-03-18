const Cart = require('../model/cart');
const user = require('../model/user');


const createCart = async (req, res) => {
  try {
    const { username } = req.params;
    const myuser = await user.findOne({ username });
    if (!myuser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = myuser._id;
    let cart = await Cart.findOne({ userId });
    if (cart) {
      return res.status(200).json({ cartId: cart._id });
    }
    cart = new Cart({ userId, productId: "default", quantity: 0 }); 
    await cart.save();
    res.status(201).json({ cartId: cart._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Controller to get cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all cart items for the given user
    const cartItems = await Cart.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Filter out cart items where prod zuctId is "0" and quantity is 0
    const filteredCartItems = cartItems.filter(cartItem => cartItem.productId !== "0" || cartItem.quantity !== 0);

    // Create a map to aggregate quantities for each product ID
    const productQuantitiesMap = new Map();
    filteredCartItems.forEach(cartItem => {
      const { productId, quantity } = cartItem;
      if (productQuantitiesMap.has(productId)) {
        // If product ID already exists in the map, add quantity
        productQuantitiesMap.set(productId, productQuantitiesMap.get(productId) + quantity);
      } else {
        // If product ID doesn't exist in the map, set quantity
        productQuantitiesMap.set(productId, quantity);
      }
    });

    // Convert map to array of objects containing productId and quantity
    const cartContents = [...productQuantitiesMap].map(([productId, quantity]) => ({
      productId,
      quantity
    }));

    res.json(cartContents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Controller to add product to cart

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find cart item for the given user and product
    let cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      // If cart item doesn't exist, create a new one
      cartItem = new Cart({ userId, productId, quantity });
    } else {
      // If cart item exists, update its quantity
      cartItem.quantity += quantity;
    }
    
    // Save the cart item to the database
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    console.log(req.params)
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log(cart)
    
    if(cart.productId === productId &&  cart.quantity > 0){
      cart.quantity--;
      await cart.save();
      return res.json(cart); 
    } else {
      return res.status(500).json("Product Id not found"); 
    }   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = { removeFromCart, addToCart, getCartByUserId, createCart }