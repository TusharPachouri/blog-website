import { useState } from 'react';
import '../App.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatar: null,
    coverImage: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/login";
      }
      // If you want to handle the response data, you can update the component state or display it on the UI.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="signup-container">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
            required
          />

          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleFileChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        <div className="Details"></div>
      </div>
    </div>
  );
};

export default SignUp;
