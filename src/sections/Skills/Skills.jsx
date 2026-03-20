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

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Technical Skills</h1>

      {isInitializing && <p className={styles.note}>Loading skills...</p>}

      {!isInitializing && data && (
        <div className={styles.skillList}>
          {data.skills.map((skill) => (
            <SkillList key={skill.id} src={checkMarkIcon} skill={skill.name} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Skills;
