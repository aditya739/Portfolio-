// Updated Projects.jsx to restore dynamic GitHub fetching and added badge support for featured projects like PayOrchestrator.

import React, { useEffect, useState } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    // Function to fetch projects from GitHub
    const fetchProjects = async () => {
        const response = await fetch('https://api.github.com/users/aditya739/repos');
        const data = await response.json();
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>My Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <a href={project.html_url}>{project.name}</a>
                        {project.name === 'PayOrchestrator' && <span className="badge">Featured</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;