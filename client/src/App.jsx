import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config({
//   path: "./.env",
// });

function App() {
  // const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://blog-website-sigma-olive.vercel.app/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // console.log(data);
  console.log(import.meta.env.VITE_REACT_APP_HOST);

  return (
    <>
      {data && (
        <div>
          <h2>Response from server:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <h2>HOST: {import.meta.env.VITE_REACT_APP_HOST}</h2>
      <h1>react app</h1>
    </>
  );
}

export default App;
