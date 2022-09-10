import React from 'react';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

import SignUp from './components/SignUp';
import FrontPage from './components/FrontPage';
import MenuAppBar from './components/MenuAppBar';
import RentPage from './components/RentPage';
import Profile from './components/Profile';
import AddProperty from './components/AddProperty';
import SingleRental from './components/SingleRental';
import Messages from './components/Messages/';

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
        <Route path='/rent/:id' element={<SingleRental />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<Profile editMode={true} />} />
        <Route path='/add' element={<AddProperty />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </>
  );
};

export default App;
