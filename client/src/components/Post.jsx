import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/img/backgroundImage.jpg";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/v1/posts/${postId}`);
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

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container bg-black mx-auto mt-05 px-4">
          {post ? (
            <div
              className="bg-black rounded-3xl shadow-lg overflow-hidden "
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {/* Avatar */}
              <img
                className="w-20 h-20 rounded-full mx-auto mt-4"
                src={post.owner.avatar}
                alt="Avatar"
              />

              {/* Post Image */}
              <div className="relative flex justify-center">
                <img
                  className="w-50 h-90 object-cover"
                  src={post.postImage}
                  alt={post.title}
                />
              </div>

              {/* Post Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-4 text-glossy">
                  {post.title}
                </h1>
                <h2 className="text-lg text-white mb-4">
                  <span className="font-semibold">
                    <b>By:</b>
                  </span>{" "}
                  <span className="capitalize text-glossy">
                    {post.owner.fullName}
                  </span>
                </h2>
                <p className="text-white leading-relaxed mb-6 text-glossy">
                  <b>Content: </b>
                  {post.content}
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
