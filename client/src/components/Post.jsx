import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/img/backgroundImage.jpg";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const responseData = await response.json();
        if (responseData.success) {
          setPost(responseData.data.post); // Update state with post object from data field
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);
  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container mx-auto mt-0 px-3">
          {post ? (
            <div className="rounded-3xl shadow-lg overflow-hidden">
              {/* Avatar and Name */}
              <div className="flex rounded-3xl items-center p-4 mt-20">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={post.owner.avatar}
                  alt="Avatar"
                />
                <h2 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-red-700 ">
                  {post.owner.fullName
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                    .join(" ")}
                </h2>
              </div>

              {/* Post Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  className="w-full h-auto rounded-md"
                  src={post.postImage}
                  alt={post.title}
                />
              </div>

              {/* Post Details */}
              <div className="p-6 text-center">
                <h1 className="text-3xl font-semibold leading-normal  dark:text-red-700 mb-2">
                  <u className="text-glossy">Title:</u>{" "}
                  <span className="text-white">{post.title}</span>
                </h1>
                <h1 className="text-xl font-semibold leading-normal  dark:text-red-700 mb-2">
                  <u className="text-glossy">Content:</u>{" "}
                  <span className="text-white">{post.content}</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                  Uploaded on: {formatTime(post.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-xl">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
