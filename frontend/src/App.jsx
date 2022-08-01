import React from 'react';
import Login from './components/Login';

function App() {
  return (
    (!localStorage.getItem('user') && <Login />)
  );
}

export default App;
