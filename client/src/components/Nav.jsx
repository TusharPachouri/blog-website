import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Function to fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            method: "GET",
            credentials: "include", // Include credentials for authentication (cookies)
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>{/* Your logo */}</div>
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
          >
            Contact
          </Link>
        </li>
        {loggedIn && (
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
            >
              Profile
            </Link>
          </li>
        )}
        {!loggedIn && (
          <>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
