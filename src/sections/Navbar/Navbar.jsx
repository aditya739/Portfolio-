import { useState } from 'react';
import styles from './NavbarStyles.module.css';
import { useTheme } from '../../common/ThemeContext';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const themeIcon = theme === 'light' ? sun : moon;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Aditya Singh</div>

            <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
                <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
                <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
                <a href="#achievements" onClick={() => setIsOpen(false)}>Achievements</a>
                <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </div>

            <div className={styles.controls}>
                <img
                    src={themeIcon}
                    alt="Toggle theme"
                    className={styles.themeIcon}
                    onClick={toggleTheme}
                />
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
