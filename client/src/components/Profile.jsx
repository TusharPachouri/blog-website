import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/users/user",
          {
            method: "GET",
            credentials: "include",
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
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch user's posts from the API
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/posts/user",
          {
            method: "GET",
            credentials: "include",
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
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="profile-container bg-gray-100 h-screen flex justify-center items-center">
      {userData && (
        <div className="max-w-lg rounded overflow-hidden shadow-lg">
          <div
            className="profile-cover w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${userData.coverImage})` }}
          ></div>
          <div className="px-6 py-4">
            <div className="profile-avatar flex justify-center">
              <img
                className="w-32 h-32 rounded-full border-4 border-white"
                src={userData.avatar}
                alt="Avatar"
              />
            </div>
            <div className="text-center">
              <div className="font-bold text-xl mb-2">
                <b>Name: </b> {userData.fullName}
              </div>
              <p className="text-gray-700 text-base">
                <b>Email: </b>
                {userData.email}
              </p>
              <p className="text-gray-700 text-base">
                <b>Username:</b> {userData.username}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Render user's posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          <b>My Posts: </b>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-64 object-cover"
                src={post.postImage}
                alt={post.title}
              />
              <div className="p-4">
                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h1>
                <h2 className="text-sm text-gray-600 mb-2">
                  <b> By:</b> {post.owner.username}
                </h2>
                <p className="text-gray-700">
                  <b>Content:</b> {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
