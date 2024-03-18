import { FETCH_CART_FAILURE, FETCH_CART_SUCCESS } from "./actiontype";

export const addToCartSuccess = product => ({
  type: FETCH_CART_SUCCESS,
  payload: product
});

export const removeFromCartSuccess = (productId) => ({
  type: 'REMOVE_FROM_CART_SUCCESS',
  payload: productId,
});

export const removeFromCartFailure = (error) => ({
  type: 'REMOVE_FROM_CART_FAILURE',
  payload: error,
});

export const addToCart = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:2000/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        throw new Error('Not able to fecth');
      }
      const data = await response.json();
      console.log(data)
      dispatch(addToCartSuccess(data));
      return data; 
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };
};

export const fetchCartProducts = (username) => {
  return async dispatch => {
    try {
      const response = await fetch(`http://localhost:2000/cart/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Products');
      }
      const data = await response.json();
      data.forEach(product => {
        dispatch(addToCartSuccess(product));
      });
      // Dispatch a success action after all products are fetched
      dispatch({ type: FETCH_CART_SUCCESS });
    } catch (error) {
      // Dispatch an action in case of failure
      console.error('Error fetching products:', error);
      dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
    }
  };
};


export const fetchCartByUserId = (userId) => {
  return async (dispatch) => {
    try {
      // Make API call to fetch cart data
      const response = await fetch(`http://localhost:2000/cart/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();

      // Dispatch action to update cart data in Redux store
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_CART_FAILURE', payload: error.message });
    }
  };
};

export const removeFromCart = (productId, userId) => {
  return async (dispatch) => {
    try {
      // Make API call to fetch cart data
      const response = await fetch(`http://localhost:2000/cart/${userId}/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();

      // Dispatch action to update cart data in Redux store
      dispatch({ type: 'REMOVE_FROM_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REMOVE_FROM_CART_FAILURE', payload: error.message });
    }
  };
};
