import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Aboutus from './pages/Aboutus'
import Contactus from './pages/Contactus'
import Meals from './pages/Meals'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </>
  );
}

export default App