import styles from './ExperienceStyles.module.css';

function Experience() {
    return (
        <section id="experience" className={styles.container}>
            <h1 className="sectionTitle">Experience</h1>
            <div className={styles.experienceContainer}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Codec Technologies</h3>
                        <span>Dec 2024 - Feb 2025</span>
                    </div>
                    <h4>Software Development Intern (Remote)</h4>
                    <ul>
                        <li>Designed and developed <strong>15+ resilient RESTful APIs</strong> using Node.js and Express.js, serving 500+ users with 99.9% uptime.</li>
                        <li>Engineered security-first design with <strong>JWT-based role authentication</strong> across 3 user roles, reducing unauthorized access by 40%.</li>
                        <li>Optimized system performance by refactoring middleware and MongoDB queries, reducing API latency by <strong>35%</strong>.</li>
                        <li>Collaborated in an Agile team of 5 engineers, contributing <strong>20+ code-reviewed pull requests</strong>.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Experience;
