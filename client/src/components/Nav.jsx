import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
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

  // Scroll behavior effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] lg:w-[75%] z-50 
        bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl
        transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
            NebulaBlogs
          </span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="md:hidden p-3 text-white/80 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-white/20 hover:bg-slate-700/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Links */}
        <div
          className={`w-full md:w-auto md:flex md:items-center transition-all duration-500 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col md:flex-row md:space-x-2 mt-4 md:mt-0 bg-slate-900/80 backdrop-blur-xl md:bg-transparent 
            rounded-3xl md:rounded-none border border-white/20 md:border-0 p-6 md:p-0 space-y-2 md:space-y-0"
          >
            {/* Search */}
            <li className="mb-4 md:mb-0 md:mr-4">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 
                      focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="Search posts..."
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl 
                      hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </li>

            {/* Nav Links */}
            {["Home", "About Us", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  className="group flex items-center py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="font-medium">{item}</span>
                </Link>
              </li>
            ))}

            {loggedIn ? (
              <li>
                <Link
                  to="/profile"
                  className="group flex items-center py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">Profile</span>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="group flex items-center py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="group relative px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl 
                      hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden flex items-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Sign Up
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
