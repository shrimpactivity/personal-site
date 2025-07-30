import { NavLink } from "react-router";

interface NavigationProps {
  style?: "vertical" | "horizontal";
}

const Navigation = (props: NavigationProps) => {
  // TODO: Adjust styling based on props
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li>
          <NavLink to="/recommendations">Recommendations</NavLink>
        </li>
        <li>
          <NavLink to="/shrimp">Shrimp Activity</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
