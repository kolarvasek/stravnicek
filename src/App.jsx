import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App