import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [isConnected, setIsConnected] = useState(false);
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
        <>
            <Link href="/yourHeroStories">
                <h1>Histoires dont vous êtes le héros</h1>
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
        </>
    );
}