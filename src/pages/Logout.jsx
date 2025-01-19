import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch(
          "https://kolarva23.sps-prosek.cz/api/logout.php",
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.status === "success") {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
