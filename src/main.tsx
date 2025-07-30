import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import Recommendations from "./pages/Recommendations.tsx";
import Contact from "./pages/Contact.tsx";
import Shrimp from "./pages/Shrimp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
