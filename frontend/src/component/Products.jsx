/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Cart/action';
import { connect } from 'react-redux';
import { checkToken, getuserId } from '../helper/utils';
import { fetchProducts } from '../redux/Products/action';

const Products = ({ fetchProducts, productsFromReducers }) => {
  useEffect(() => {
    checkToken();
  }, []);

  const [productQuantities, setProductQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = async (productId) => {
    try {
      const userId = await getuserId();
      const quantity = productQuantities[productId] || 1;
      dispatch(addToCart(userId, productId, quantity)).then(() => alert("Item Added"));
    } catch (error) {
      console.error('Error fetching user ID:', error);
      // Handle the error as needed
    }
  };


  const handleQuantityChange = (productId, value) => {
    setProductQuantities(prevState => ({
      ...prevState,
      [productId]: value
    }));
  };

  const card = (obj) => {
    const productId = obj._id;
    return (
      <div className="max-w-sm flex flex-col justify-between max-h-50 bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 border-transparent rounded-lg  shadow dark:bg-white-800 dark:border-gray-700 relative" key={productId}>
        <a href="#">
          <img src={obj?.imageUrl} className="rounded-t-lg object-cover h-48 w-full z-10" alt="" style={{ position: 'relative' }} />
        </a>
        <div className="p-2 max-h-70">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{obj?.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-900">{obj?.description}</p>
        </div>
        {/* <p className="mb-3 font-normal text-gray-400 dark:text-gray-900">Limited offer only {obj?.quantity} left</p> */}
        <p className="mb-3 font-normal text-gray-400 dark:text-gray-900">Rs.{obj?.price}</p>
        <div className="flex items-center" >
          <input
            type="number"
            id="quantity"
            value={productQuantities[productId] || 1}
            min={1}
            max={obj?.quantity}
            onChange={(e) => handleQuantityChange(productId, parseInt(e.target.value))}
            className="ml-5 mb-2 mr-2 py-2 px-4 border border-gray-300 rounded-md"
          />
          <button onClick={() => handleAddToCart(productId)} className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add To Cart</button>
        </div>
      </div>
    );
  };

  return (
    <div className='p-20 grid grid-cols-3 gap-4'>
      {productsFromReducers?.map(obj => card(obj))}
    </div>
  );
};

const mapStateToProps = state => ({
  productsFromReducers: state.Products.Products
});

const mapDispacthToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispacthToProps)(Products);
