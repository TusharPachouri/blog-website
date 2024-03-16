import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleLogout = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/logout`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        // Clear any local storage, state, or context related to authentication
        // Redirect the user to the login page or any other page
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/");
        // Reload the page
        window.location.reload();
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-container">
      <button
        onClick={handleLogout}
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
