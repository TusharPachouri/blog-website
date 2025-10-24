import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10 py-16">
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {post ? (
          <div className="w-full max-w-4xl mx-auto">
            {/* Post Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Post Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-white/20 shadow-lg"
                    src={post.owner.avatar}
                    alt="Avatar"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {post.owner.fullName
                        .split(" ")
                        .map(
                          (name) => name.charAt(0).toUpperCase() + name.slice(1)
                        )
                        .join(" ")}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {formatTime(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {post.content}
                </p>

                {/* Post Image */}
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <img
                    className="w-full h-auto max-h-96 object-cover"
                    src={post.postImage}
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </div>
                      <span className="font-medium">Like</span>
                    </button>
                    <button className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      </div>
                      <span className="font-medium">Comment</span>
                    </button>
                    <button
                      className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
                      onClick={toggleShareModal}
                    >
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <span className="font-medium">Share</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">Published</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl max-w-md w-full mx-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Share this post
                    </h2>
                    <button
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                      onClick={toggleShareModal}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <EmailShareButton
                      url={window.location.href}
                      className="group relative px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Email
                      </span>
                    </EmailShareButton>

                    <FacebookShareButton
                      url={window.location.href}
                      className="group relative px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </span>
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={window.location.href}
                      className="group relative px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Twitter
                      </span>
                    </TwitterShareButton>

                    <WhatsappShareButton
                      url={window.location.href}
                      className="group relative px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        WhatsApp
                      </span>
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Loading Post...
              </h2>
              <p className="text-white/60 text-lg">
                Please wait while we fetch the post content.
              </p>
            </div>
          </div>
        )}

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8 z-20">
          <div className="flex flex-col gap-3">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          * {
            font-family: 'Inter', sans-serif;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform:translateY(-20px); }
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Post;
