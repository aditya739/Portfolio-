import { motion } from "framer-motion";
import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/Design uten navn.png";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
// import CV from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "light" ? sun : moon;
  // const twitterIcon = theme === "light" ? twitterLight : twitterDark;
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      {/* Image + Theme Toggle */}
      <motion.div
        className={styles.colorModeContainer}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Hero Image */}
        <motion.img
          src={heroImg}
          className={styles.hero}
          alt="Profile picture of Aditya SINGH"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Theme Toggle Icon */}
        <motion.img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          onClick={toggleTheme}
        />
      </motion.div>

      {/* Text + Info Section */}
      <motion.div
        className={styles.info}
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Aditya <br /> Singh
        </motion.h1>

        <motion.h2
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Full Stack Developer
        </motion.h2>

        {/* Social Icons */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/aditya739"
            target="_blank"
            whileHover={{ scale: 1.3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={githubIcon} alt="Github icon" />
          </motion.a>

          <motion.a
            href="www.linkedin.com/in/aditya-singh-b34054267"
            target="_blank"
            whileHover={{ scale: 1.3, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={linkedinIcon} alt="Linkedin icon" />
          </motion.a>


        </motion.span>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Full-stack web development using MERN stack, RESTful APIs, and modern
          frameworks, with proven Hackathon achievements and projects.
        </motion.p>

        {/* Resume Button */}
        <motion.a
          href=""
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className="hover"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#007BFF",
              color: "#fff",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Resume
          </motion.button>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;
