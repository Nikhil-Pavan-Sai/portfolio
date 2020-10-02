import React, { useEffect, useState } from "react";
import smoothScroll from "smoothscroll-polyfill";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home.js";
import About from "./Components/About/About.js";
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    smoothScroll.polyfill();

    const getJsonData = async () => {
      await fetch(`${process.env.PUBLIC_URL}/my_data.json`)
        .then((data) => data.json())
        .then((data) => setData(data));
    };
    getJsonData();
  }, []);

  return (
    <div className="app">
      <Header logo={data.logo} name={data.name} />
      <Home
        name={data.name}
        background={data.backgrounds}
        about={data.about}
      />
      <About profilePic={data.profilePic} about={data.about} />
    </div>
  );
}

export default App;
