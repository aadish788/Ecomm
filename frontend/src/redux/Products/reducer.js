import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./actiontype";

const initialState = {
    Products: [],
    loading: false,
    error: null
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                Products: action.payload,
                error: null
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default ProductsReducer