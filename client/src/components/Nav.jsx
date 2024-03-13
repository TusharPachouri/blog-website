import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/backgroundImage.jpg"; // Replace this with the path to your background image

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Function to fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/v1/users/user`, {
          method: "GET",
          credentials: "include", // Include credentials for authentication (cookies)
        });
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
    <nav
      className="bg-slate-950 py-2 md:flex md:justify-between md:items-center rounded-xl fixed top-0 w-full z-50"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mx-1 md:mx-0">
        <Link
          to="/"
          className="text-4xl font-bold leading-normal dark:text-red-700 text-center block"
        >
          Blogging Website
        </Link>
      </div>
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
