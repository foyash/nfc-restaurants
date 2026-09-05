import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// capture-safe class for ?still screenshots (neutralizes vh-based hero height)
if (new URLSearchParams(window.location.search).has("still")) {
  document.documentElement.classList.add("still");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
