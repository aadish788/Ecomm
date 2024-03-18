import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST } from "./actiontype";

const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST
});

const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});
 
const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:2000/product/getProducts');
            if (!response.ok) {
                throw new Error('Failed to fetch Products');
            }
            const data = await response.json();
            dispatch(fetchProductsSuccess(data));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};

export { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess, fetchProducts }