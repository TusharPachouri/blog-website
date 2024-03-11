import Posts from "./Post";
import CreatePost from "./CreatePost";
import { useState, useEffect } from 'react';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Function to fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            method: "GET",
            credentials: "include", // Include credentials for authentication (cookies)
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      {loggedIn && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Create a New Post:{" "}
          </h1>
          <CreatePost />
        </>
      )}
      <h1 className="text-3xl font-bold mb-4 text-red-600">Recent Posts: </h1>
      <Posts />
    </>
  );
}

export default Home;
