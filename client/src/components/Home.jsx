import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useState, useEffect } from "react";
import background from "../assets/img/backgroundImage.jpg";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `/api/v1/users/user`,   // todo: here
          {
            method: "GET",
            credentials: "include", // Include credentials for authentication (cookies)
          }
        );
        const data = await response.json();

        if (response.ok) {
          if (data && data.data) {
            setLoggedIn(true);
          } else {
            console.error("User details not found in response data:", data);
            setLoggedIn(false);
          }
        } else {
          console.error("Response not OK:", response);
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run once on component mount

  const handleCreatePostClick = () => {
    setIsCreatePostVisible(true);
  };

  const handleCancelClick = () => {
    setIsCreatePostVisible(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {loggedIn && (
          <>
            <h1 className="font-bold text-red-700 text-5xl mb-2 text-glossy ">
              Create a New Post{" "}
            </h1>
            {isCreatePostVisible ? (
              <div>
                <CreatePost />
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleCreatePostClick}
              >
                Create Post
              </button>
            )}
          </>
        )}
        <h1 className="font-bold text-red-700 text-5xl mb-2 text-glossy ">
          Posts{" "}
        </h1>
        <Posts />
      </div>
    </>
  );
};

export default Home;
