import styles from './ProjectsStyles.module.css';
import viberr from '../../assets/viberr.png';
import freshBurger from '../../assets/fresh-burger.png';
import lms from "../../assets/lms.jpg";
import fitLift from '../../assets/fitlift.png';
import ProjectCard from '../../common/ProjectCard';
import weather from '../../assets/wp.JPG';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={viberr}
          link="https://github.com/aditya739/Affiliate-Auto_poster.git"
          h3="AffiPost"
          p="Turn Deals into Posts, Effortlessly"
        />
        <ProjectCard
          src={freshBurger}
          link="https://github.com/aditya739/chatbot.git"
          h3="gBot"
          p="Ai chatBot"
        />
        <ProjectCard
          src={lms}
          link="https://github.com/aditya739/Lms.git"
          h3="LMS"
          p="Affordable Learning, Teaching Made Simple."
        />
        <ProjectCard
          src={fitLift}
          link="https://github.com/Ade-mir/company-landing-page-2"
          h3="EMP"
          p="Fitness ApSmartly assign, track, and manage"
        />
         <ProjectCard
          src={weather}
          link="https://github.com/aditya739/weather_app.git"
          h3="ApWeatherly"
          p="weather app that delivers real-time forecasts with a clean interface"
        />
      </div>
    </section>
  );
}

export default Projects;
