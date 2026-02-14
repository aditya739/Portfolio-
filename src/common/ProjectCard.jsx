import PropTypes from 'prop-types';
import styles from '../sections/Projects/ProjectsStyles.module.css';

function ProjectCard({ src, link, h3, p }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className={styles.cardHeader}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      <img src={src} alt={`${h3} logo`} />
      <div className={styles.cardBody}>
        <h3>{h3}</h3>
        <p>{p}</p>
      </div>
    </a>
  );
}

ProjectCard.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  h3: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
};

export default ProjectCard;
