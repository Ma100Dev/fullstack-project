import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import rentalReducer from './reducers/rentalReducer';
import conversationReducer from './reducers/conversationReducer';

import thunk from 'redux-thunk';

const reducer = combineReducers(
    {
        user: userReducer,
        rentals: rentalReducer,
        conversations: conversationReducer
    }
);


const store = configureStore({
    reducer,
    devTools: true,
    middleware: [thunk]
});

export default store;