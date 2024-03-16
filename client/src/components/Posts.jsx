import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [expandedPosts, setExpandedPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts`
      );
      const data = await response.json();
      if (response.ok) {
        // Sort posts by createdAt timestamp in descending order
        const sortedPosts = data.data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      } else {
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const toggleExpansion = (postId) => {
  //   if (expandedPosts.includes(postId)) {
  //     setExpandedPosts(expandedPosts.filter((id) => id !== postId));
  //   } else {
  //     setExpandedPosts([...expandedPosts, postId]);
  //   }
  // };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
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
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </span>
            </h2>
            <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <b>Username:</b>{" "}
              <span className="dark:text-white">{post.owner.username}</span>
            </h2>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
            </p> */}
            <div className="flex justify-end relative bottom-0 right-0 p-2">
              <p className="text-white ">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}{" "}
      {/* Reverse the order of posts to display newest first */}
    </div>
  );
};

export default Posts;
