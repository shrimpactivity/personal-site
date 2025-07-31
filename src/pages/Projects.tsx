import ghostwriter from "../assets/ghostwriter-logo.png"
import pigment from "../assets/pigment-logo.png";

const Projects = () => {
  return (
    <div>
      <h1>Personal Projects</h1>
      <div>
        <h2>Ghostwriter</h2>
        <p>Co-write with your favorite long-dead (and therefore public domain) authors.</p>
        <img src={ghostwriter} alt="Ghostwriter Logo" />
      </div>
      <div>
        <h2>Pigment</h2>
        <p>A chaotic particle painting program, directly in the browser.</p>
        <img src={pigment} alt="Pigment Logo" />
      </div>
    </div>
  );
};

export default Projects;
