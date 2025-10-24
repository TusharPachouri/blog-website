import { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts?page=${currentPage}`
        );
        const data = await response.json();
        if (response.ok) {
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

    fetchData();
  }, [currentPage]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(posts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex justify-center items-center mt-16 mb-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                paginate(currentPage - 1);
                window.scrollTo(0, 0);
              }}
              disabled={currentPage === 1}
              className={`group flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-105"
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex space-x-1">
              {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(pageNumbers.length, currentPage + 2)).map((number) => (
                <button
                  key={number}
                  onClick={() => {
                    paginate(number);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === number
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 scale-110"
                      : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-105"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                paginate(currentPage + 1);
                window.scrollTo(0, 0);
              }}
              disabled={currentPage === totalPages}
              className={`group flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-105"
              }`}
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full">
        {/* Loading Animation */}
        <div className="flex flex-col justify-center items-center py-24">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-purple-400 border-r-blue-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            Loading <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Stories</span>
          </h3>
          <p className="text-white/70 text-lg font-medium">Discovering amazing content for you...</p>
          
          {/* Loading dots animation */}
          <div className="flex space-x-1 mt-6">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        {/* Loading Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="h-48 lg:h-56 bg-gradient-to-br from-white/10 to-white/5 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-white/10 rounded-lg animate-pulse"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
                  <div className="flex space-x-3">
                    <div className="w-5 h-5 bg-white/10 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-white/10 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {currentPosts.map((post, index) => (
          <div
            key={post._id}
            className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Post Image */}
            <div className="relative overflow-hidden">
              <img
                className="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                src={post.postImage}
                alt={post.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => window.location.href = `/post/${post._id}`}
                  className="group/btn relative px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Story
                  </span>
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                  Featured
                </span>
              </div>

              {/* Reading Time Badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg">
                  <svg className="w-3 h-3 text-white/80 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/80 text-xs font-medium">5 min</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h1 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {post.owner.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {post.owner.fullName
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </p>
                  <p className="text-white/60 text-xs">@{post.owner.username}</p>
                </div>
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center text-white/60 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.createdAt)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="text-white/60 hover:text-red-400 transition-colors duration-300 hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-blue-400 transition-colors duration-300 hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentPosts.length === 0 && !isLoading && (
        <div className="text-center py-24">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Posts Yet</h3>
          <p className="text-white/60 text-lg">Be the first to share your story with the world!</p>
        </div>
      )}

      {/* Pagination */}
      {posts.length > postsPerPage && renderPaginationButtons()}
    </div>
  );
};

export default Posts;