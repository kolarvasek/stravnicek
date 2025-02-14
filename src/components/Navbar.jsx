import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Stravnicek Dashboard
        </div>
        <nav className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/meals")}
            className="text-gray-300 hover:text-white"
          >
            Meals
          </button>
          <button
            onClick={() => navigate("/logout")}
            className="text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
