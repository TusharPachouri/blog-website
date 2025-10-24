import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Typed from "typed.js";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Blog Posts", "Stories to Inspire", "Knowledge Hub"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        };
        // Extract accessToken from cookies
        const accessToken = getCookie("accessToken");
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/v1/users/user`,
          {
            method: "GET",
            credentials: "include", // Include credentials for authentication (cookies)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center py-16 lg:py-24 text-center max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white/80 text-sm font-medium">Live & Interactive</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
              Welcome to our{" "}
              <span ref={el} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" />
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light">
              Explore a world of captivating stories and insightful knowledge where every word matters and every story inspires.
            </p>
          </div>

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Reading</span>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
              Discover More
            </button>
          </div> */}
        </div>

        {/* Create Post Section for Logged In Users */}
        {loggedIn && (
          <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Share Your Story</h2>
                </div>

                {isCreatePostVisible ? (
                  <div className="w-full space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <CreatePost />
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                        onClick={handleCancelClick}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">Cancel</span>
                      </button>
                      <button
                        className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">Publish</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    onClick={handleCreatePostClick}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Post
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Posts Section */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Stories</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            <div className="absolute "></div>
            <Posts />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8 z-20">
          <div className="flex flex-col gap-3">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style >{`
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
  );
};

export default Home;