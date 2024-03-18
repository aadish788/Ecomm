import { combineReducers } from 'redux';

import cartReducer from '../Cart/reducer';
import ProductsReducer from '../Products/reducer';

const rootReducer = combineReducers({
    Products: ProductsReducer,
    cart: cartReducer
});

export default rootReducer;


