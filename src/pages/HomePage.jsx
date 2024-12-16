import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Calorie from '../components/Calories'

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="overscroll-y-none	">
      <Navbar />
      <Calorie />
    </div>
  );
}

export default HomePage