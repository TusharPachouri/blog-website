import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        // Clear any local storage, state, or context related to authentication
        // Redirect the user to the login page or any other page
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
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
