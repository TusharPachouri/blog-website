import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import backgroundImage from "../assets/img/backgroundImage.jpg"; // Replace this with the path to your background image

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/v1/users/user/`, {
          method: "GET",
          credentials: "include", // todo
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/api/v1/posts/user`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const postData = await response.json();
          setUserPosts(postData.data.posts);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/delete/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div
      className="profile-container min-h-screen flex flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* User Details */}
      <div className="bg-100 rounded-xl py-8 px-4 relative">
        {userData && (
          <div className="max-w-lg mx-auto rounded overflow-hidden shadow-lg bg-black relative">
            <div
              className="profile-cover w-full h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${userData.coverImage})` }}
            >
              <div className="absolute left-0 top-0 h-full w-1/2">
                {/* Empty div to create space for the avatar */}
              </div>
              <div className="absolute top-1/2 transform -translate-y-.2 ml-50">
                <img
                  className="w-32 h-32 rounded-full border-4 border-white"
                  src={userData.avatar}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-center">
                <div className="font-bold text-white text-xl mb-2 text-glossy  ">
                  <b>Name: </b>{" "}
                  {userData.fullName
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </div>
                <p className="  text-white text-base text-glossy">
                  <b>Email: </b>
                  {userData.email}
                </p>
                <p className=" text-white text-base text-glossy">
                  <b>Username:</b> {userData.username}
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

  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 relative">
    {userPosts.map((post) => (
      <div
        key={post._id}
        className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative"
      >
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={post.postImage}
            alt={post.title}
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <Link
              to={`/post/${post._id}`}
              className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              Read More
            </Link>
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            {post.title}
          </h1>
          <h2 className="text-sm text-gray-600 mb-2">
            <b>By:</b> {post.owner.username}
          </h2>
          <p className="text-gray-700 mb-4">
            <b>Content:</b> {post.content}
          </p>
          <button
            onClick={() => handleDeletePost(post._id)}
            className="bg-red-500 text-white py-1 px-2 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Logout Button */}
      <div className="fixed bottom-4 right-4">
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
