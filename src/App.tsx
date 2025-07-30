import { useState } from "react";
import "./App.css";

function App() {
  const [groovy, setGroovy] = useState(false);
  return (
    <div>
      <p>Hi, I'm Carson Crow. Welcome to my website.</p>
      <nav>
        <ul>
          <li>
            <a href="/about">About Me</a>
          </li>
          <li>
            <a href="/projects">Personal Projects</a>
          </li>
          <li><a href="/recommendations">Recommendations</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <button onClick={() => setGroovy(!groovy)}>{groovy ? "Make Website Less Cool" : "Make Website Cooler"}</button>
    </div>
  );
}

export default App;
