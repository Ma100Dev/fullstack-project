import React from 'react';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

import SignUp from './components/SignUp';
import FrontPage from './components/FrontPage';
import MenuAppBar from './components/MenuAppBar';
import RentPage from './components/RentPage';
import Profile from './Profile';

const user = localStorage.getItem('user');

const App = () => {
  const dispatch = useDispatch();
  if (user) {
    dispatch(setUser(JSON.parse(user)));
  }
  return (
    <>
      <MenuAppBar />
      <Routes>
        <Route path='/' element={(<FrontPage />)} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rent' element={<RentPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
