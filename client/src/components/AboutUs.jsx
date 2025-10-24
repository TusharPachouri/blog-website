import { useState } from "react";

const AboutUs = () => {
  const [userData] = useState({
    username: "tusharpachouri",
    fullName: "Tushar Pachouri",
    avatar: "https://source.unsplash.com/random/400x400/?portrait,developer",
    coverImage: "https://source.unsplash.com/random/1920x1080/?dark,abstract",
    aboutMe:
      "Full-Stack Developer | ReactJS | NodeJS | Designing and Building Unique Digital Experiences.",
    skills: [
      "ReactJS",
      "NodeJS",
      "JavaScript",
      "MongoDB",
      "Express",
      "Tailwind CSS",
    ],
    experience: "3+ Years",
    projects: "50+",
    location: "India",
  });

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
            <span className="text-white/80 text-sm font-medium">About Us</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Developer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            Passionate about creating innovative digital solutions and building
            amazing user experiences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden">
            <div
              className="profile-cover w-full h-48 bg-cover bg-center relative rounded-t-3xl"
              style={{ backgroundImage: `url(${userData.coverImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <img
                  className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl"
                  src={userData.avatar}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="px-8 py-8 pt-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                  {userData.fullName}
                </h1>
                <p className="text-white/60 text-lg mb-6">
                  @{userData.username}
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {userData.aboutMe}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {userData.experience}
              </h3>
              <p className="text-white/60">Experience</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {userData.projects}
              </h3>
              <p className="text-white/60">Projects</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {userData.location}
              </h3>
              <p className="text-white/60">Location</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Tech{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Stack
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-white font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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

export default AboutUs;
