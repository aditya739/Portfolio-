import styles from './AchievementsStyles.module.css';

function Achievements() {
    return (
        <section id="achievements" className={styles.container}>
            <h1 className="sectionTitle">Achievements</h1>
            <div className={styles.achievementsContainer}>
                <div className={styles.card}>
                    <h3>Hackathon Winner</h3>
                    <p>1st Place at [Hackathon Name]</p>
                    <span>2024</span>
                </div>
                <div className={styles.card}>
                    <h3>Web Dev Certification</h3>
                    <p>Full Stack Bootcamp</p>
                    <span>2023</span>
                </div>
                <div className={styles.card}>
                    <h3>Open Source Contributor</h3>
                    <p>Active contributions to React ecosystem</p>
                    <span>Ongoing</span>
                </div>
            </div>
        </section>
    );
}

export default Achievements;
