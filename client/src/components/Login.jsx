import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Username and password are required");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/login`)

      const data = await response.json();

      console.log(data); // Handle response data as needed

      if (response.ok) {
        document.cookie = `accessToken=${data.data.accessToken}; path=/`;
        document.cookie = `refreshToken=${data.data.refreshToken}; path=/`;

        // Redirect to home page
        window.location.href = "/";
      } else {
        setErrorMessage(data.message); // Set error message from response data
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?dark,technology')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-3xl mb-6 text-white font-bold">Login</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4 font-medium">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;