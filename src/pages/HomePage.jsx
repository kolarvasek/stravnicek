import React from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={(e) => navigate("/login")}>Go to Login</button>
      <h1 className="text-red-500">Hello world!</h1>
    </div>
  );
}

export default HomePage