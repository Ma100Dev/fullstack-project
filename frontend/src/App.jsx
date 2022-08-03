import React from 'react';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import FrontPage from './components/FrontPage';
import MenuAppBar from './components/MenuAppBar';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser } from './reducers/userReducer'

const user = localStorage.getItem('user')

const App = () => {
  const dispatch = useDispatch()
  if (user) {
    dispatch(setUser(JSON.parse(user)))
  }
  return (
    <>
      <MenuAppBar />
      <Routes>
        <Route path='/' element={(<FrontPage />)} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
