import { FETCH_CART_FAILURE, FETCH_CART_SUCCESS } from "./actiontype";


const initialState = {
  products: [],
  loading: false,
  error: null
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
    case FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
