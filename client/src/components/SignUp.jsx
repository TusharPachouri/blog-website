import { useState } from "react";
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
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const loginResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          document.cookie = `accessToken=${data.data.accessToken}; path=/`;
          document.cookie = `refreshToken=${data.data.refreshToken}; path=/`;
          window.location.href = "/";
        } else {
          console.error("Error:", loginResponse.statusText);
        }
      } else {
        toast.error("User Already Registered!!");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium">
              Join Us Today
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
            Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Account
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            Start your journey with us and become part of our amazing community.
          </p>
        </div>

        {/* SignUp Form */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Create Your Account
                </h2>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Choose a username"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">
                    Profile Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleFileChange}
                      required
                      accept="image/*"
                      className="block w-full text-sm text-white/60 file:mr-4 file:py-3 file:px-4 
                      file:rounded-2xl file:border-0 file:text-sm file:font-medium
                      file:bg-gradient-to-r file:from-purple-600 file:to-purple-700 file:text-white 
                      hover:file:from-purple-700 hover:file:to-purple-800 cursor-pointer
                      file:transition-all file:duration-300 file:hover:scale-105"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">
                    Cover Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="coverImage"
                      onChange={handleFileChange}
                      required
                      accept="image/*"
                      className="block w-full text-sm text-white/60 file:mr-4 file:py-3 file:px-4 
                      file:rounded-2xl file:border-0 file:text-sm file:font-medium
                      file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 file:text-white 
                      hover:file:from-blue-700 hover:file:to-blue-800 cursor-pointer
                      file:transition-all file:duration-300 file:hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Create Account
                    </div>
                  )}
                </span>
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold hover:underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8 z-20">
          <div className="flex flex-col gap-3">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          * {
            font-family: 'Inter', sans-serif;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default SignUp;
