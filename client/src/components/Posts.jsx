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
      const response = await fetch(`/api/v1/posts`);
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

  const [expandedPosts, setExpandedPosts] = useState([]);

  const toggleExpansion = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
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
              <b className=" underline">Title</b>: {post.title}
            </h1>
            <h2 className="text-sm text-gray-600 mb-2">
              <b>Name: </b>{" "}
              {post.owner.fullName
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </h2>
            <h2 className="text-sm text-gray-600 mb-2">
              <b>Username:</b> {post.owner.username}
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              <b>Content:</b>{" "}
              {expandedPosts.includes(post._id)
                ? post.content
                : `${post.content.slice(0, 100)}...`}
              {post.content.length > 100 && (
                <button
                  className="text-blue-600 hover:underline focus:outline-none"
                  onClick={() => toggleExpansion(post._id)}
                >
                  {expandedPosts.includes(post._id) ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
