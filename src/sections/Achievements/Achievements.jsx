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
                    <h3>Trekathon 1.0</h3>
                    <p>IoT Technical Excellence</p>
                    <span>2022</span>
                </div>
                <div className={styles.card}>
                    <h3>Leadership</h3>
                    <p>Campus Ambassador (Physics Wallah) & Outreach Intern (Pregrad)</p>
                    <span>2022 - 2023</span>
                </div>
            </div>
        </section>
    );
}

export default Achievements;
