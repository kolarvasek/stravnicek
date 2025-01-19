import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Meals from "./pages/Meals";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
