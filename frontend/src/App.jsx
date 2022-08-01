import React from 'react';
import Login from './components/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/' element={(!localStorage.getItem('user') ? <Navigate to="/login" /> : <div>front page</div>)} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
