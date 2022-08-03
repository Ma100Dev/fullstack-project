import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser } from '../reducers/userReducer'

const FrontPage = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleClick1 = () => {
        dispatch(setUser({ name: 'Pekka' }))
        console.log(user)
    }
    const handleClick2 = () => {
        dispatch(clearUser())
        console.log(user)
    }
    return (
        <div>
            <h1>Front Page</h1>
            <button onClick={handleClick1}>Set user</button>
            <button onClick={handleClick2}>Clear user</button>
        </div>
    );
}

export default FrontPage;