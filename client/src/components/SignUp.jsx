import { useState } from "react";
import backgroundImage from "../assets/img/backgroundImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);

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
      setLoading(true); // Set loading to true when the form is submitted
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/register`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // Registration successful, proceed with login
        const loginResponse = await fetch(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          document.cookie = `accessToken=${data.data.accessToken}; path=/`;
          document.cookie = `refreshToken=${data.data.refreshToken}; path=/`;
          // Redirect to home page or wherever you want the user to go after login
          window.location.href = "/";
        } else {
          // Handle login error
          console.error("Error:", loginResponse.statusText);
        }
      } else {
        // Handle registration error
        toast.error('User Already registered!!'); 
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading to false after the registration process completes
    }
  };

  return (
    <div
      className="flex justify-center items-center  pt-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
              disabled={loading} // Disable the button when loading is true
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              {loading ? ( // Show loading spinner or "Register" text based on loading state
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
