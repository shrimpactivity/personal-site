import { NavLink } from "react-router";
import ResumeDownload from "./buttons/ResumeDownload";

interface NavigationProps {
  style?: "vertical" | "horizontal";
}

const Navigation = (_props: NavigationProps) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/about">About Me</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li>
          <NavLink to="/shrimp">Shrimp Activity?</NavLink>
        </li>
        <li>
          <a href="https://github.com/shrimpactivity">GitHub</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/carson-crow-29b83b254/">
            LinkedIn
          </a>
        </li>
        <li>
          <ResumeDownload />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
