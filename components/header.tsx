import styles from '../styles/header.module.css';
import Logo from "../assets/img/logo.png";
import Menu from "../assets/img/burger-bar.png";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; import classNames from 'classnames';

export default function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [displayHeader, setDisplayHeader] = useState(false);
    const router = useRouter();

    const checkConnection = async () => {
        try {
            const response = await axios.get('/api/checkIsConnected'); // Appeler l'API route
            setIsConnected(response.data.isConnected);
        } catch (error) {
            console.error('Error checking connection:', error);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        // Appelle la fonction lors du chargement de la page et lors des changements de route
        checkConnection();

        // Le deuxième argument [] assure que l'effet ne s'exécute que lors du premier chargement
        const handleRouteChange = () => {
            checkConnection(); // Appel lors d'un changement de route
        };
        router.events.on('routeChangeComplete', handleRouteChange); // Écoute des changements de route

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]); // exécution lors d'un changement de route

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src={Logo.src} alt="le logo du site" className={styles.logo} />
                    </Link>
                </div>
                <img
                    src={Menu.src}
                    alt="Menu"
                    className={classNames(styles.displayMobile, styles.menu)}
                    onClick={() => { setDisplayHeader(!displayHeader) }}
                />
                <div className={classNames(styles.buttons, styles.displayPC)}>
                    <Link href="/yourHeroStory">
                        <h1>L'histoire dont vous êtes le héros </h1>
                    </Link>
                    <Link href="/news">
                        <h1>Nouvelles</h1>
                    </Link>
                    <Link href="/jdr">
                        <h1>JDR</h1>
                    </Link>
                    {isConnected ? (
                        <Link href="/profile">
                            <h1>Profil</h1>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <h1>Se connecter</h1>
                        </Link>
                    )}
                    <Link href="/contact">
                        <h1>Contact</h1>
                    </Link>
                </div>
            </div >
            {displayHeader && (
                <div className={classNames(styles.buttons, styles.displayMobile)}>
                    <Link href="/yourHeroStory">
                        <h1>L'histoire dont vous êtes le héros </h1>
                    </Link>
                    <Link href="/news">
                        <h1>Nouvelles</h1>
                    </Link>
                    <Link href="/jdr">
                        <h1>JDR</h1>
                    </Link>
                    {isConnected ? (
                        <Link href="/profile">
                            <h1>Profil</h1>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <h1>Se connecter</h1>
                        </Link>
                    )}
                    <Link href="/contact">
                        <h1>Contact</h1>
                    </Link>
                </div>
            )}
        </div>
    );
}