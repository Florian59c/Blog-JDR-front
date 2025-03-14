import styles from '../styles/userComment.module.css';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Arrow from '../assets/img/return-arrow.png';

export default function UserComments() {
    const [isConnected, setIsConnected] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const checkConnection = async () => {
        try {
            const response = await axios.get('/api/checkIsConnected'); // Appeler l'API route
            setIsConnected(response.data.isConnected);
        } catch (error) {
            console.error('Error checking connection:', error);
            setIsConnected(false);
        }
    };

    async function getCurrentUser() {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}user/getCurrentUser`,
                {},
                {
                    withCredentials: true,
                }
            )
            setPseudo(response.data.pseudo);
            setEmail(response.data.email);
        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'affichage de vos informations personnelles")
        }
    }

    useEffect(() => {
        checkConnection();
        getCurrentUser();
    }, []);

    return (
        <div>
            {isConnected ? (
                <div>
                    <Link href="/profile" className={styles.return}>
                        <img src={Arrow.src} alt="flèche" />
                        <p>retourner sur la page de profil</p>
                    </Link>
                    <div className="blockContainer">
                        <h1>UserComments</h1>
                    </div>
                </div>
            ) : (
                <div className="blockContainer">
                    <h1>Vous ne pouvez pas accéder à cette page si vous n'êtes pas connecté</h1>
                    <div className="buttonContainer">
                        <Link href="/login">
                            <button className="button-style button-color-validate">Se connecter</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}