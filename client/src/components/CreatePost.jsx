import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    postImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store the user ID
  const [generatedContent, setGeneratedContent] = useState("");

  function writeContentWordByWord(content, callback) {
    // Split the content into an array of words
    const words = content.split(/\s+/);

    // Initialize a counter to keep track of the current word being written
    let i = 0;

    // Use setInterval to simulate the writing process
    const intervalId = setInterval(() => {
      // Check if all words have been written
      if (i < words.length) {
        // Invoke the callback function with the current word
        callback(words[i]);
        i++; // Move to the next word
      } else {
        // Clear the interval when all words have been written
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval duration as needed
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        };
        const accessToken = getCookie("accessToken");
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          if (data && data.data) {
            setUserId(data.data._id); // Set the user ID
          } else {
            console.error("User details not found in response data:", data);
          }
        } else {
          console.error("Response not OK:", response);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run once on component mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, postImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content || generatedContent);
    formDataToSend.append("postImage", formData.postImage);
    formDataToSend.append("userId", userId); // Add userId to the formData

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/create`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setFormData({ title: "", content: "", postImage: null });
        window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/gemini/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: formData.title }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        writeContentWordByWord(data.data.content, (word) => {
          setGeneratedContent((prevContent) => prevContent + word + " ");
        });
        toast.success("Content Generated Successfully!");
      } else {
        console.error("Failed to generate content");
        toast.error("Error while generating the content");}
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            required
          />
          {/* <button
            type="button"
            onClick={handleGenerateContent}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Content
          </button> */}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="content"
          >
            Content:
          </label>
          <textarea
            name="content"
            id="content"
            value={generatedContent || formData.content}
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
              setGeneratedContent(""); // Clear the generated content when manually editing
            }}
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleGenerateContent}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Generate Content
        </button>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="postImage"
          >
            Post Image:
          </label>
          <input
            type="file"
            name="postImage"
            id="postImage"
            onChange={handleImageChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            // required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
