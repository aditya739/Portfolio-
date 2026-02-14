import styles from './AchievementsStyles.module.css';

function Achievements() {
    return (
        <section id="achievements" className={styles.container}>
            <h1 className="sectionTitle">Achievements</h1>
            <div className={styles.achievementsContainer}>
                <div className={styles.card}>
                    <h3>Smart India Hackathon</h3>
                    <p>National Finalist</p>
                    <span>2023-24</span>
                </div>
                <div className={styles.card}>
                    <h3>STPI Hackathon</h3>
                    <p>Innovation Finalist</p>
                    <span>2023-24</span>
                </div>
                <div className={styles.card}>
                    <h3>Data Structures</h3>
                    <p>600+ Questions Solved on LeetCode & GFG</p>
                    <span>Ongoing</span>
                </div>
                <div className={styles.card}>
                    <h3>Super 30 Program</h3>
                    <p>Top 30 Students Statewide</p>
                    <span>2022</span>
                </div>
            </div>
        </section>
    );
}

export default Achievements;
