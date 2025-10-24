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
  const [userId, setUserId] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");

  function writeContentWordByWord(content, callback) {
    const words = content.split(/\s+/);
    let i = 0;
    const textareaElement = document.getElementById("content");

    const intervalId = setInterval(() => {
      if (i < words.length) {
        callback(words[i]);
        i++;
        textareaElement.style.height = "auto";
        textareaElement.style.height = `${textareaElement.scrollHeight}px`;
      } else {
        clearInterval(intervalId);
        toast.success("✨ Content Generated Successfully!");
      }
    }, 100);
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
        if (response.ok && data?.data) {
          setUserId(data.data._id);
        } else {
          console.error("Error fetching user details:", data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

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
    formDataToSend.append("userId", userId);

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
        toast.success("🚀 Post Created Successfully!");
        setFormData({ title: "", content: "", postImage: null });
        setGeneratedContent("");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error("❌ Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    setGeneratedContent("");
    const textareaElement = document.getElementById("content");
    textareaElement.style.height = `60px`;

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
          setGeneratedContent((prev) => prev + word + " ");
        });
      } else {
        toast.error("⚠️ Error while generating content");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Failed to generate content");
    }
  };

  return (
    <div className="mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl transition-all duration-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        ✍️ Create a New Blog Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={generatedContent || formData.content}
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
              setGeneratedContent("");
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            required
          />
          <button
            type="button"
            onClick={handleGenerateContent}
            className="mt-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-800 transition-all"
          >
            ⚡ Auto Generate Content
          </button>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold" htmlFor="files">
            Upload Image
          </label>
          <input
            type="file"
            id="files"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-white"
                viewBox="0 0 100 101"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591..."
                  fill="currentColor"
                />
              </svg>
              Creating...
            </div>
          ) : (
            "🚀 Create Post"
          )}
        </button>
      </form>
      <ToastContainer position="top-right" theme="dark" autoClose={2000} />
    </div>
  );
};

export default CreatePost;
