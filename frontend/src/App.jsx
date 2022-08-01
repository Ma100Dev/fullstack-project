import React from 'react';
import Login from './components/Login';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={(!localStorage.getItem('user') && <Login />)} />
      <Route path='/signUp' element={<div />} />
    </Routes>
  );
}

export default App;
