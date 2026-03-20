import React from 'react';
import './Projects.css'; // Assuming there is a separate CSS for styles

const Projects = () => {
    return (
        <div className="projects-container">
            <h1>Featured Projects</h1>
            <div className="featured-project">
                <h2>PayOrchestrator</h2>
                <span className="badge featured">Featured</span>
                <p>Description of PayOrchestrator...</p>
            </div>
            {/* Other projects can be listed here */}
        </div>
    );
};

export default Projects;