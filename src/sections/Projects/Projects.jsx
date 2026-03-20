import React, { useEffect, useState } from 'react';

const Projects = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const response = await fetch('https://api.github.com/users/aditya739/repos');
            const data = await response.json();
            setRepos(data);
        };
        fetchRepos();
    }, []);

    const featuredProject = repos.find(repo => repo.name === 'PayOrchestrator');

    return (
        <div>
            {featuredProject && (
                <div className="featured-project">
                    <h2>{featuredProject.name}</h2>
                    <span className="badge">Featured</span>
                    <p>{featuredProject.description}</p>
                    <a href={featuredProject.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            )}
            <h3>Other Projects</h3>
            <ul>
                {repos.filter(repo => repo.name !== 'PayOrchestrator').map(repo => (
                    <li key={repo.id}>
                        <h4>{repo.name}</h4>
                        <p>{repo.description}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
