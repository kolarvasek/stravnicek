import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <button onClick={() => navigate("/")} className="text-lg font-semibold">
        Home
      </button>
      <div className="flex-1 flex justify-center space-x-4">
        <button
          onClick={() => navigate("/food")}
          className="text-lg font-semibold">
          Food
        </button>
      </div>
      <button
        onClick={() => navigate("/logout")}
        className="text-lg font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
