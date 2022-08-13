import React from "react";
import logo from "./logo.svg";
import { instagramScrape } from "./scrape/InstagramScrape";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={instagramScrape}></button>
    </div>
  );
}

export default App;
