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


const store = configureStore({
    reducer,
    devTools: ENV === 'development',
    middleware: [thunk]
});

export default store;
