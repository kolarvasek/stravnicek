import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Calories";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("https://kolarva23.sps-prosek.cz/api/server.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.status !== "success") {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default HomePage;