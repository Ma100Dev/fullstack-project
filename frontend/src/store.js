import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import rentalReducer from './reducers/rentalReducer';
import conversationReducer from './reducers/conversationReducer';
import errorReducer from './reducers/errorReducer';

import { ENV } from './utils/config';
import thunk from 'redux-thunk';

const reducer = combineReducers(
    {
        user: userReducer,
        rentals: rentalReducer,
        conversations: conversationReducer,
        errors: errorReducer
    }
);


const setupStore = (state = {}) => configureStore({
    reducer,
    devTools: ENV === 'development',
    middleware: [thunk],
    preloadedState: state
});

export default setupStore;
