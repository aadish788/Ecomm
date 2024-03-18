import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Change this import
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './Reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
}

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultStore = () => {
    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    const persistor = persistStore(store);
    return { store, persistor };
}

export default defaultStore;
