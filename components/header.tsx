import styles from '../styles/header.module.css';
import Logo from "../assets/img/logo.png";
import BurgerBar from "../assets/img/burger-bar.png";
import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import Menu from "../components/menu";

export default function Header() {
    const [displayHeader, setDisplayHeader] = useState(false);

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src={Logo.src} alt="le logo du site" className={styles.logo} />
                    </Link>
                </div>
                <img
                    src={BurgerBar.src}
                    alt="Menu"
                    className={classNames(styles.displayMobile, styles.menu)}
                    onClick={() => { setDisplayHeader(!displayHeader) }}
                />
                <div className={classNames(styles.buttons, styles.displayPC)}>
                    <Menu />
                </div>
            </div >
            {displayHeader && (
                <div className={classNames(styles.buttons, styles.displayMobile)}>
                    <Menu />
                </div>
            )}
        </div>
    );
}