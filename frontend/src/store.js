import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers(
    {
        user: userReducer
    }
)


const store = configureStore({
    reducer,
    devTools: true,
    middleware: [thunk]
})

export default store