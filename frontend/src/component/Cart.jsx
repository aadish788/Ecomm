/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserId } from '../helper/utils';
import { fetchCartByUserId, removeFromCart } from '../redux/Cart/action'; // Assuming you have an action creator for removing from the cart

const Cart = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(state => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getuserId();
        if (userId) {
          dispatch(fetchCartByUserId(userId));
        } else {
          throw new Error('Failed to fetch user ID');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRemoveFromCart = (productId) => {
    const userId = getuserId();
    dispatch(removeFromCart(userId, productId));
  };

  return (
    <div className="p-20 grid grid-cols-3 gap-4">
      {products && products.length > 0 ? (
        products.map((item, index) => (
          <CartItemCard key={index} item={item} onRemove={() => handleRemoveFromCart(item.productId)} />
        ))
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
};

const CartItemCard = ({ item, onRemove }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:2000/product/${item.productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [item.productId]);

  return (
    <div className="max-w-sm flex flex-col justify-between max-h-50 bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 border-transparent rounded-lg shadow dark:bg-white-800 dark:border-gray-700 relative">
      <div className="p-2 max-h-70">
        {productDetails ? (
          <>
            <a href="#">
              <img src={productDetails?.imageUrl} className="rounded-t-lg object-cover h-48 w-full z-10" alt="" style={{ position: 'relative' }} />
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-900">Product Name: {productDetails.name}</p>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-900">Quantity in Cart: {item.quantity}</p>
            <button className='w-full my-5 py-2 bg-teal-500 text-white font-semibold rounded-lg' onClick={() => onRemove(item.productId)} type='submit'>Remove From Cart</button>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
