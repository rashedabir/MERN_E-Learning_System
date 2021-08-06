import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Scroll from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <Header />
      <Scroll showBelow={250} />
    </Router>
  );
}

export default App;
