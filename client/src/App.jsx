// import './App.css';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/about' element={<h1>about</h1>} />
          <Route path='/contact' element={<h1>contact</h1>} />
          <Route path='/logout' element={<h1>logout component here</h1>} />
          <Route path='/profile' element={<h1>profile component here</h1>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter> 
      {/* <Footer /> */}

    </div>
  );
}

export default App;
