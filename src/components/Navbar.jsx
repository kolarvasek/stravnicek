import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-black text-white z-10">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/aboutus")}
            className="text-lg font-semibold"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("/contactus")}
            className="text-lg font-semibold"
          >
            Contact Us
          </button>
        </div>
        <button
          onClick={() => navigate("/logout")}
          className="text-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
