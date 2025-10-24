import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Search = () => {
  const { search } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // Set the desired number of posts per page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_HOST
          }/api/v1/search/${search}?page=${currentPage}`
        );
        const data = await response.json();
        if (response.ok) {
          const sortedPosts = data.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setSearchData(sortedPosts);
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
  }, [search, currentPage]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium">
              Search Results
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
            Search for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              &ldquo;{search}&rdquo;
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            {searchData.length > 0
              ? `Found ${searchData.length} result${
                  searchData.length === 1 ? "" : "s"
                } for your search`
              : "No results found for your search query"}
          </p>
        </div>

        {searchData.length === 0 ? (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                No Posts Found
              </h2>
              <p className="text-white/60 text-lg mb-6">
                Sorry, there are no posts matching your search query &ldquo;
                {search}&rdquo;.
              </p>
              <p className="text-white/40">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Search Results */}
            <div className="w-full max-w-7xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Search{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Results
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="relative">
                      <img
                        className="w-full h-48 object-cover"
                        src={post.postImage}
                        alt={post.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          to={`/post/${post._id}`}
                          className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/20"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <h1 className="mb-3 text-2xl font-bold text-white line-clamp-2">
                        {post.title}
                      </h1>
                      <p className="mb-4 text-white/80 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-white/60 text-sm">
                          {formatDate(post.createdAt)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white/60 text-sm">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center -space-x-px text-sm">
                    <button
                      onClick={() => {
                        paginate(currentPage - 1);
                        window.scrollTo(0, 0);
                      }}
                      disabled={currentPage === 1}
                      className="group relative px-4 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="flex items-center">
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous
                      </div>
                    </button>

                    {Array.from(
                      { length: Math.ceil(searchData.length / postsPerPage) },
                      (_, i) => i + 1
                    ).map((number) => (
                      <button
                        key={number}
                        onClick={() => {
                          paginate(number);
                          window.scrollTo(0, 0);
                        }}
                        className={`px-4 py-3 mx-1 font-medium rounded-2xl transition-all duration-300 ${
                          currentPage === number
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                            : "bg-white/10 backdrop-blur-sm text-white/80 border border-white/20 hover:bg-white/20 hover:text-white hover:scale-105"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        paginate(currentPage + 1);
                        window.scrollTo(0, 0);
                      }}
                      disabled={
                        currentPage ===
                        Math.ceil(searchData.length / postsPerPage)
                      }
                      className="group relative px-4 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="flex items-center">
                        Next
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
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
            50% { transform: translateY(-20px); }
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

export default Search;
