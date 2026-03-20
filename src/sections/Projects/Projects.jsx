import { useEffect, useMemo, useState } from 'react';
import styles from './ProjectsStyles.module.css';

const GITHUB_USER = 'aditya739';
const FEATURED_REPO_NAME = 'PayOrchestrator';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=12&sort=created&direction=desc`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        if (!cancelled) setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load projects');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedRepos = useMemo(() => {
    return repos
      .filter((repo) => repo && !repo.fork)
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));
  }, [repos]);

  const featured = useMemo(() => {
    return (
      sortedRepos.find((repo) => repo.name === FEATURED_REPO_NAME) ||
      sortedRepos[0] ||
      null
    );
  }, [sortedRepos]);

  const others = useMemo(() => {
    return sortedRepos
      .filter((repo) => repo.name !== FEATURED_REPO_NAME)
      .slice(0, 6);
  }, [sortedRepos]);

  const dotHeader = (
    <div className={styles.headerDots} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );

  const languageLabel = (language) => (language ? language : 'Full Stack');

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <p className={styles.subtitle}>
        A snapshot of my recent work. I focus on scalable architecture,
        performance, and shipping clean, maintainable code.
      </p>

      {loading && <div className={styles.loading}>Loading projects...</div>}

      {!loading && error && <div className={styles.error}>{error}</div>}

      {!loading && !error && featured && (
        <div className={styles.featuredWrap}>
          <div className={styles.featuredCard}>
            {dotHeader}

            <div className={styles.featuredTitleRow}>
              <h2>{featured.name}</h2>
              <span className={styles.featuredBadge}>Featured</span>
            </div>

            <p>{featured.description || 'No description provided.'}</p>

            <div className={styles.metaRow}>
              <span className={styles.chip}>
                Language: {languageLabel(featured.language)}
              </span>
              <span className={styles.chip}>
                Stars: {featured.stargazers_count ?? 0}
              </span>
            </div>

            <div className={styles.ctaRow}>
              <a
                className={styles.cta}
                href={featured.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && others.length > 0 && (
        <div>
          <div className={styles.gridTitle}>
            <h3>More Projects</h3>
          </div>
          <div className={styles.grid}>
            {others.map((repo) => (
              <div key={repo.id} className={styles.card}>
                {dotHeader}
                <div className={styles.cardTop}>
                  <h3>{repo.name}</h3>
                </div>
                <p className={styles.cardDesc}>
                  {repo.description || 'No description provided.'}
                </p>

                <div className={styles.metaRow}>
                  <span className={styles.chip}>
                    {languageLabel(repo.language)}
                  </span>
                  <span className={styles.chip}>
                    Stars: {repo.stargazers_count ?? 0}
                  </span>
                </div>

                <div className={styles.ctaRow}>
                  <a
                    className={styles.cta}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
