import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Shrimp from "./pages/Shrimp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/shrimp" element={<Shrimp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
