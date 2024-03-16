import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import backgroundImage from "../assets/img/backgroundImage.jpg";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/${postId}`
        );
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
      } finally {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    };

    fetchPost();
  }, [postId]);
  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <div className="container mx-auto mt-0 px-3">
          {post ? (
            <div
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-black bg-opacity-75 rounded-lg overflow-hidden w-50"
            >
              {/* Post Header */}
              <div className="flex items-center p-4">
                <img
                  className="w-12 h-12 rounded-full m-4"
                  src={post.owner.avatar}
                  alt="Avatar"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {post.owner.fullName
                      .split(" ")
                      .map(
                        (name) => name.charAt(0).toUpperCase() + name.slice(1)
                      )
                      .join(" ")}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {formatTime(post.createdAt)}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-2 pt-0 flex">
                <div className=" w-auto">
                  <h1 className="text-2xl font-semibold text-white mb-2 ml-20">
                    {post.title}
                  </h1>
                  <p className="text-gray-300 mb-4 ml-20">{post.content}</p>
                </div>

                {/* Post Image */}
              </div>
              <div className="relative rounded-lg overflow-hidden mb-8 mr-4">
                <img
                  className="w-auto h-64 mx-auto rounded-lg ml-20"
                  src={post.postImage}
                  alt={post.title}
                />
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between border-t border-gray-600 py-2 px-4 ml-20">
                <div className="flex items-center">
                  <button className="flex items-center text-gray-400 hover:text-white focus:outline-none">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-white focus:outline-none ml-4">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>Comment</span>
                  </button>
                  <button
                    className="flex items-center text-gray-400 hover:text-white focus:outline-none ml-48"
                    onClick={toggleShareModal}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
                {showShareModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Share this post
                      </h2>
                      <EmailShareButton
                        url={window.location.href}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Email
                      </EmailShareButton>
                      <FacebookShareButton
                        url={window.location.href}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Facebook
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Twitter
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={window.location.href}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        WhatsApp
                      </WhatsappShareButton>
                      <button
                        className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg"
                        onClick={toggleShareModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-xl">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
