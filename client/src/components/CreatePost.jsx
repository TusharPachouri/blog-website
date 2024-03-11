import { useState } from "react";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    postImage: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      postImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("postImage", formData.postImage);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/posts/create`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Post created successfully
      // Handle redirection to another page or display a success message
    } catch (error) {
      console.error("Error creating post:", error.message);
      // Handle error (display error message, etc.)
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
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
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
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
