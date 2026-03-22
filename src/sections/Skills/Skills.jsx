import { motion } from 'framer-motion';
import styles from './SkillsStyles.module.css';
import checkMarkIconDark from '../../assets/checkmark-dark.svg';
import checkMarkIconLight from '../../assets/checkmark-light.svg';
import SkillList from '../../common/SkillList';
import { useTheme } from '../../common/ThemeContext';
import { usePortfolioData } from '../../admin/usePortfolioData';

function Skills() {
  const { theme } = useTheme();
  const checkMarkIcon = theme === 'light' ? checkMarkIconLight : checkMarkIconDark;
  const { data, isInitializing } = usePortfolioData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h1>

      {isInitializing && <p className={styles.note}>Loading skills...</p>}

      {!isInitializing && data && (
        <motion.div
          className={styles.skillList}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {data.skills.map((skill) => (
            <motion.div key={skill.id} variants={itemVariants}>
              <SkillList src={checkMarkIcon} skill={skill.name} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Skills;
