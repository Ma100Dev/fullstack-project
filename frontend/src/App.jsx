import React from 'react';
import Login from './components/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import FrontPage from './components/FrontPage';

const App = () => {
  const isLoggedIn = localStorage.getItem('user')
  return (
    <>
      <div>APP BAR</div>
      <Routes>
        <Route path='/' element={(<FrontPage />)} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
