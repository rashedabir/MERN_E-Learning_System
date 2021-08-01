import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./context/GlobalState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <ToastContainer />
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
