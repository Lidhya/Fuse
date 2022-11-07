import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </>
  );
}

export default App;
