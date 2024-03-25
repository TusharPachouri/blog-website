import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/img/backgroundImage.jpg";
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

  const renderPaginationButtons = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(searchData.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center -space-x-px text-sm">
          <button
            onClick={() => {
              paginate(currentPage - 1); // Navigate to the previous page
              window.scrollTo(0, 0); // Scroll to the top of the page
            }}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-12 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {/* SVG icon for previous page */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => {
                paginate(number); // Navigate to the clicked page
                window.scrollTo(0, 0); // Scroll to the top of the page
              }}
              className={
                "flex items-center justify-center px-3 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " +
                (currentPage === number
                  ? "flex items-center justify-center px-3 h-14 rounded-md text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "")
              }
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => {
              paginate(currentPage + 1); // Navigate to the next page
              window.scrollTo(0, 0); // Scroll to the top of the page
            }}
            disabled={
              currentPage === Math.ceil(searchData.length / postsPerPage)
            }
            className="flex items-center justify-center px-3 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {/* SVG icon for next page */}
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-10 pt-8"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {searchData.length === 0 ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold  mb-4 text-gray-600">
            No posts found
          </h1>
          <p className="text-3xl text-gray-600">
            Sorry, there are no posts matching your search query.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentPosts.map((post) => (
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
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    <b>Content:</b> {post.content}
                  </p>
                  <div className="flex justify-end relative bottom-0 right-0 p-2">
                    <p className="text-white ">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <br></br>
          {renderPaginationButtons()}
        </>
      )}
    </div>
  );
};

export default Search;
