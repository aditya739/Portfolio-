import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/Design uten navn.png";
// import sun from "../../assets/sun.svg";
// import moon from "../../assets/moon.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme } = useTheme();

  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          src={heroImg}
          className={styles.hero}
          alt="Profile picture of Aditya Singh"
        />
      </div>

      <div className={styles.info}>
        <h1>
          Aditya <br /> Singh
        </h1>
        <h2>Full Stack Developer</h2>

        <span className={styles.socialIcons}>
          <a href="https://github.com/aditya739" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="Github icon" />
          </a>
          <a href="https://www.linkedin.com/in/aditya-singh-b34054267" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="Linkedin icon" />
          </a>
        </span>

        <p className={styles.description}>
          Building scalable web applications with the MERN stack.
          Focused on clean code, performance, and user-centric design.
        </p>

        <a href="" download>
          <button className="hover">Resume</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
