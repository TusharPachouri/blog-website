import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import backgroundImage from "../assets/img/backgroundImage.jpg"; // Replace this with the path to your background image

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
    <div
      className="profile-container min-h-screen flex flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* User Details */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="bg-100 rounded-xl py-8 px-4 relative mt-16">
        {userData && (
          <div className="max-w-lg mx-auto overflow-hidden rounded-3xl shadow-lg bg-black relative">
            <div
              className="profile-cover w-full h-48 bg-cover bg-center relative rounded-3xl"
              style={{ backgroundImage: `url(${userData.coverImage})` }}
            >
              <div className="absolute left-0 top-0 h-full w-1/2">
                {/* Empty div to create space for the avatar */}
              </div>
              <div className="absolute top-1/2 transform -translate-y-.2 ml-50">
                <img
                  className="w-32 h-32 rounded-full border-4 border-blue-300"
                  src={userData.avatar}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-center">
                <div className="font-bold text-white text-xl mb-2 text-glossy  ">
                  <div className="border-t-2 border-blue-300 "></div>
                  <b className=" text-2xl text-blue-300">Name: </b>{" "}
                  <span className="text-xl text-glossy">
                    {userData.fullName
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </span>
                </div>
                <p className="  text-white text-base text-glossy">
                  <b className=" text-2xl text-blue-300">Email: </b>
                  <span className="text-xl ">{userData.email}</span>
                </p>
                <p className=" text-white text-base text-glossy">
                  <b className=" text-2xl text-blue-300">Username: </b>{" "}
                  <span className="text-xl ">{userData.username}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Posts */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          <b>My Posts: </b>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={post.postImage}
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/post/${post._id}`}
                    className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                  <b className="dark:text-gray-400">Title: </b> {post.title}
                </h1>
                <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>By: </b>{" "}
                  <span className="dark:text-white">
                    {post.owner.fullName
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </span>
                </h2>
                <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>Username:</b>{" "}
                  <span className="dark:text-white">{post.owner.username}</span>
                </h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>Content:</b>{" "}
                  {expandedPosts.includes(post._id)
                    ? post.content
                    : `${post.content.slice(0, 100)}...`}
                  {post.content.length > 100 && (
                    <button
                      className="text-blue-600 hover:underline focus:outline-none"
                      onClick={() => toggleExpansion(post._id)}
                    >
                      {expandedPosts.includes(post._id)
                        ? "Show Less"
                        : "Read More"}
                    </button>
                  )}
                </p>
                <div className="flex justify-end bottom-0 right-0 p-2">
                  <p className="text-white">{formatDate(post.createdAt)}</p>
                </div>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-4 right-4 ">
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
