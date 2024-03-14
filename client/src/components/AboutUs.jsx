import { useState } from "react";
import backgroundImage from "../assets/img/backgroundImage.jpg";

const AboutUs = () => {
  const [userData] = useState({
    username: "tusharpachouri",
    fullName: "Tushar Pachouri",
    avatar: "https://source.unsplash.com/random/1920x1080/?dark,abstract", // Use backgroundImage for avatar
    coverImage: backgroundImage, // Use backgroundImage for cover image
    aboutMe:
      "Full-Stack Developer | ReactJS | NodeJS | Designing and Building Unique Digital Experiences.",
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen pt-16"
      style={{
        backgroundImage: `url(${userData.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-3xl mb-6 text-white font-bold">About Us</h1>
        <div className="text-gray-300">
          <div className="flex justify-center mb-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src={userData.avatar} // Use userData.avatar for the avatar image
              alt="Avatar"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">{userData.username}</h2>
            <p className="text-base">{userData.fullName}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-base">{userData.aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
