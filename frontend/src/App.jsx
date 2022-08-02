import React from 'react';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import FrontPage from './components/FrontPage';
import MenuAppBar from './components/MenuAppBar';

const App = () => {
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
