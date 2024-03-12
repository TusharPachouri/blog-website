import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Function to fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            withCredentials: true, // Include credentials for authentication (cookies)
          }
        );
        const data = response.data;
        if (response.status === 200 && data.success) {
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
    <nav className="bg-gray-800 py-4 md:flex md:justify-between md:items-center">
      <div className="mx-4 md:mx-0">{/* Your logo */}</div>
      <ul className="flex flex-col md:flex-row md:space-x-4 mx-4 md:mx-0">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
          >
            Contact
          </Link>
        </li>
        {loggedIn && (
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
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
                className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600 block md:inline-block mb-2 md:mb-0"
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
