/* eslint-disable no-unused-vars */
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Post from "./components/Post";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <BrowserRouter>
        <Nav />
        <div className="flex-grow w-full"> {/* Adjusted padding for mobile */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;