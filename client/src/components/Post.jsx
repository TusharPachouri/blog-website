import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  // console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts`)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/v1/posts`
      );
      // console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts`)
      const data = await response.json();
      if (response.ok) {
        setPosts(data.data.posts);
      } else {
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h1>
            <h2 className="text-sm text-gray-600 mb-2">
              <b>By:</b>{" "}
              <span className="capitalize">
                {post.owner.username.split(" ")[0]}{" "}
                {post.owner.username.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-gray-700 line-clamp-3">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
