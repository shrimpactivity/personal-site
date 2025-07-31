import ResumeDownload from "../components/buttons/ResumeDownload";
import Tile from "../components/navigation/NavTile";

export const About = () => {
  return (
    <div>
      <Tile width="20em" height="20em" selected={false}>Testing</Tile>
      <h1>About Me</h1>
      <div>
        <h2>Experience</h2>
        <p>
          I'm a full stack software engineer who's been writing code for over a
          decade.
        </p>
        <p>Initially it was Java applets and web games in high school.</p>
        <p>Then math stuff and data visualization with Python in college.</p>
        <p>
          Now I make data management applications with React, Typescript,
          Express, Ruby on Rails, and lots of SQL.
        </p>
      </div>
      <div>
        <h2>What I Know</h2>
        <ul>
          <li>Javascript / Typescript</li>
          <li>React</li>
          <li>Express</li>
          <li>Ruby on Rails</li>
          <li>MSSQL</li>
          <li>Java</li>
          <li>Python</li>
          <li>Azure DevOps</li>
          <li>Git</li>
          <li>Stack Overflow</li>
        </ul>
      </div>
      <div>
      <h2>Resume</h2>
      <ResumeDownload text="Download"/>
      </div>
    </div>
  );
};

export default About;
