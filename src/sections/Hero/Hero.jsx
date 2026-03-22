import { motion } from 'framer-motion';
import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/Design uten navn.png";
// import sun from "../../assets/sun.svg";
// import moon from "../../assets/moon.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import cvPdf from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme } = useTheme();

  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, delay: 0.1 }
    }
  };

  return (
    <section id="hero" className={styles.container}>
      <motion.div
        className={styles.colorModeContainer}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src={heroImg}
          className={styles.hero}
          alt="Profile picture of Aditya Singh"
        />
      </motion.div>

      <motion.div
        className={styles.info}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>
          Aditya <br /> Singh
        </motion.h1>
        <motion.h2 variants={itemVariants}>Full Stack Developer</motion.h2>

        <motion.span className={styles.socialIcons} variants={itemVariants}>
          <a href="https://github.com/aditya739" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="Github icon" />
          </a>
          <a href="https://www.linkedin.com/in/aditya-singh-b34054267" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="Linkedin icon" />
          </a>
        </motion.span>

        <motion.p className={styles.description} variants={itemVariants}>
          Building scalable web applications with the MERN stack.
          Focused on clean code, performance, and user-centric design.
        </motion.p>

        <motion.a
          href={cvPdf}
          download="Aditya-Singh-Resume.pdf"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="hover">Resume</button>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;
