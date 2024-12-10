import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <button onClick={() => navigate("/")} className="float-left">Home</button>
      <div className="flex">
        <button onClick={() => navigate("/food")} className="ml-10">Food</button>
        <button onClick={() => navigate("/logout")} className="ml-auto">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
