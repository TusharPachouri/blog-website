import { useState, useEffect } from "react";

const Posts = () => {
  // console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts`)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts`);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
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
  );
};

export default Posts;
