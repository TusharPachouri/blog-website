import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/users/logout",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          // Clear any local storage, state, or context related to authentication
          // Redirect the user to the login page or any other page
          navigate("/login");
        } else {
          console.error("Failed to log out");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // Since this is a logout component, it doesn't render anything
};

export default Logout;
