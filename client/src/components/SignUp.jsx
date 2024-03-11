import { useState } from "react";
import "../App.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen pt-16"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1920x1080/?dark,abstract')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-3xl mb-6 text-white font-bold">
          User Registration
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Avatar:
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Cover Image:
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleFileChange}
              required
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
