import { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectsStyles.module.css';

import { usePortfolioData } from '../../admin/usePortfolioData';

function Projects() {
  const { data, isInitializing, error } = usePortfolioData();

  const featuredAndOthers = useMemo(() => {
    const projects = Array.isArray(data?.projects) ? data.projects : [];

    const featured =
      projects.find((p) => p.featured) || (projects.length > 0 ? projects[0] : null);

    const others = projects
      .filter((p) => featured ? p.id !== featured.id : true)
      .slice(0, 6);

    return { featured, others };
  }, [data]);

  const dotHeader = (
    <div className={styles.headerDots} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );

  const languageLabel = (language) => (language ? language : 'Full Stack');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <section id="projects" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        A snapshot of my recent work. I focus on scalable architecture,
        performance, and shipping clean, maintainable code.
      </motion.p>

      {isInitializing && <div className={styles.loading}>Loading projects...</div>}

      {!isInitializing && error && <div className={styles.error}>{error}</div>}

      {!isInitializing && !error && featuredAndOthers.featured && (
        <motion.div
          className={styles.featuredWrap}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={styles.featuredCard}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {dotHeader}

            <div className={styles.featuredTitleRow}>
              <h2>{featuredAndOthers.featured.name}</h2>
              <span className={styles.featuredBadge}>Featured</span>
            </div>

            <p>{featuredAndOthers.featured.description || 'No description provided.'}</p>

            <div className={styles.metaRow}>
              <span className={styles.chip}>
                Language: {languageLabel(featuredAndOthers.featured.language)}
              </span>
              <span className={styles.chip}>
                Stars: {featuredAndOthers.featured.stars ?? 0}
              </span>
            </div>

            <div className={styles.ctaRow}>
              <a
                className={styles.cta}
                href={featuredAndOthers.featured.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {!isInitializing && !error && featuredAndOthers.others.length > 0 && (
        <div>
          <div className={styles.gridTitle}>
            <h3>More Projects</h3>
          </div>
          <div className={styles.grid}>
            {featuredAndOthers.others.map((project) => (
              <motion.div
                key={project.id}
                className={styles.card}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
              >
                {dotHeader}
                <div className={styles.cardTop}>
                  <h3>{project.name}</h3>
                </div>
                <p className={styles.cardDesc}>
                  {project.description || 'No description provided.'}
                </p>

                <div className={styles.metaRow}>
                  <span className={styles.chip}>
                    {languageLabel(project.language)}
                  </span>
                  <span className={styles.chip}>
                    Stars: {project.stars ?? 0}
                  </span>
                </div>

                <div className={styles.ctaRow}>
                  <a
                    className={styles.cta}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
