import axios from "axios";
import React from "react";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// optional configuration for react-alert
const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

// import "@fontawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// axios.defaults.headers.common["Authorization"] = `Bearer ${document.cookie}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

axios.defaults.baseURL = "http://localhost:8000";

// cors policy
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
