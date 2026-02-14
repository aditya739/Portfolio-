import { useEffect, useState } from 'react';
import styles from './ProjectsStyles.module.css';
import ProjectCard from '../../common/ProjectCard';

// Local placeholder images
import viberr from '../../assets/viberr.png';
import freshBurger from '../../assets/fresh-burger.png';
import lms from "../../assets/lms.jpg";
import fitLift from '../../assets/fitlift.png';
import weather from "../../assets/wp.jpg";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder images (cycled)
  const images = [viberr, freshBurger, lms, fitLift, weather];

  useEffect(() => {
    fetch('https://api.github.com/users/aditya739/repos?sort=updated&per_page=10')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        return response.json();
      })
      .then(data => {
        // Remove forked repositories
        const filtered = data.filter(repo => !repo.fork);

        // Sort by latest updated
        const sorted = filtered.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setProjects(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching repos:", err);
        setError("Unable to load projects.");
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          projects.map((repo, index) => (
            <ProjectCard
              key={repo.id}
              src={images[index % images.length]}
              link={repo.html_url}
              h3={repo.name}
              p={repo.description || "No description available."}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Projects;
