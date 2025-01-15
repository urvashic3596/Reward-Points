import React from "react";
import ReactDOM from "react-dom"; // Use ReactDOM instead of react-dom/client
import App from "./app";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This is the mounting point for your app
);
