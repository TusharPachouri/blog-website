/* eslint-disable no-unused-vars */
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import AboutUs from "./components/AboutUs";
import Post from "./components/Post";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
// import Nav from "./components/Nav";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Contact from "./components/Contact";
// import Profile from "./components/Profile";
// import Logout from "./components/Logout";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Perform login logic and set isLoggedIn to true
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // Perform logout logic and set isLoggedIn to false
//     setIsLoggedIn(false);
//   };

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<h1>About</h1>} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/signup" element={<SignUp />} />
//           {isLoggedIn ? (
//             <Route path="/profile" element={<Profile />} />
//           ) : (
//             <Navigate to="/login" />
//           )}
//           <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
