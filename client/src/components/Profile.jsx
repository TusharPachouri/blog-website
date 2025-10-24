import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`; // Function to extract cookie value by name
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Extract accessToken from cookies
        const accessToken = getCookie("accessToken");

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const accessToken = getCookie("accessToken");
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const postData = await response.json();
          setUserPosts(postData.data.posts);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    };

    fetchUserPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/delete/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching user data
    }
  };
  const [expandedPosts, setExpandedPosts] = useState([]);

  const toggleExpansion = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10">
        {/* User Details */}
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto py-16">
          {userData && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden">
              <div
                className="profile-cover w-full h-48 bg-cover bg-center relative rounded-t-3xl"
                style={{ backgroundImage: `url(${userData.coverImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <img
                    className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl"
                    src={userData.avatar}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div className="px-8 py-8 pt-16">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                    {userData.fullName
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </h1>
                  <div className="space-y-3">
                    <p className="text-white/80 text-lg">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold">
                        Email:{" "}
                      </span>
                      <span className="text-white">{userData.email}</span>
                    </p>
                    <p className="text-white/80 text-lg">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold">
                        Username:{" "}
                      </span>
                      <span className="text-white">@{userData.username}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Posts */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Posts
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={post.postImage}
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/post/${post._id}`}
                      className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/20"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="mb-3 text-2xl font-bold text-white line-clamp-2">
                    {post.title}
                  </h1>
                  <div className="mb-4 space-y-2">
                    <p className="text-white/70">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold">
                        By:{" "}
                      </span>
                      <span className="text-white">
                        {post.owner.fullName
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </span>
                    </p>
                    <p className="text-white/70">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold">
                        Username:{" "}
                      </span>
                      <span className="text-white">@{post.owner.username}</span>
                    </p>
                  </div>
                  <p className="mb-4 text-white/80">
                    {expandedPosts.includes(post._id)
                      ? post.content
                      : `${post.content.slice(0, 100)}...`}
                    {post.content.length > 100 && (
                      <button
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:underline focus:outline-none ml-2"
                        onClick={() => toggleExpansion(post._id)}
                      >
                        {expandedPosts.includes(post._id)
                          ? "Show Less"
                          : "Read More"}
                      </button>
                    )}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-white/60 text-sm">
                      {formatDate(post.createdAt)}
                    </p>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-full p-3">
            <Logout />
          </div>
        </div>
      </div>

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
  );
};

export default Profile;
