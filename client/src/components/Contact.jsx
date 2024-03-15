import { useState } from "react";
import backgroundImage from "../assets/img/backgroundImage.jpg";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/contacts/`, formData);
      console.log(response.data); // Assuming you want to log the response
      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Handle error display or other actions
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed bg-black bg-opacity-75"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-black bg-opacity-75 pt-10">
        <div className="flex justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-4 text-white">
            CONTACT US
          </h1>
          <p className="text-center text-gray-400 mb-8">
            CONTACT INFO : +91 82 18 054 473
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-gray-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-gray-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="contactNumber"
                className="text-sm font-medium text-gray-300"
              >
                Contact No
              </label>
              <input
                type="text"
                id="contactNumber"
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-gray-500"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-gray-500 h-32"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-6 py-2  bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-800 text-white p-4 text-center">
          <a
            href="https://www.linkedin.com/in/tushar-pachouri/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
          >
            <svg
              className="w-6 h-6 fill-current text-blue-600"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="90" strokeWidth="20" />
              <path
                d="M62.737004,13.7923523 C105.08055,51.0454853 135.018754,126.906957 141.768278,182.963345"
                strokeWidth="20"
              ></path>
              <path
                d="M10.3787186,87.7261455 C41.7092324,90.9577894 125.850356,86.5317271 163.474536,38.7920951"
                strokeWidth="20"
              ></path>
              <path
                d="M41.3611549,163.928627 C62.9207607,117.659048 137.020642,86.7137169 189.041451,107.858103"
                strokeWidth="20"
              ></path>
            </svg>
            <span>Tushar Pachouri</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
