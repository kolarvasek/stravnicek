import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
        <Navbar />
    </div>
  );
}

export default HomePage