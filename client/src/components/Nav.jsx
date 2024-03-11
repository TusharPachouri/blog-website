import { Link } from "react-router-dom"; // Replace this with the path to your logo
// import Logo from "../assets/img/logo.png";
const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        {/* <img
          src={Logo}
          alt="Logo"
          className="h-10 rounded-full w-50"
        /> */}
      </div>
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
        <li>
          <Link
            to="/profile"
            className="text-white hover:text-gray-300 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-600"
          >
            Profile
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default Nav;
