import styles from '../styles/profile.module.css';
import { TextField } from "@mui/material";
import axios from "axios";
import { NextApiRequest } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
    const [isConnected, setIsConnected] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');
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
                <div className="blockContainer">
                    <div className={styles.singleButton}>
                        <button
                            className="button-style button-color-validate"
                            onClick={async () => {
                                await axios.post(
                                    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`, {}, { withCredentials: true });
                                router.push('/');
                            }}
                        >
                            Se déconnecter
                        </button>
                    </div>
                    <h1>Mon profil</h1>
                    <div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault(); // Empêche le rechargement de la page
                                setconfirmMessage('');
                                setError('');
                                try {
                                    const response = await axios.post(
                                        `${process.env.NEXT_PUBLIC_SERVER_URL}user/updateUser`,
                                        { pseudo, email },
                                        {
                                            withCredentials: true,
                                        }
                                    )
                                    if (response.data === "ok") {
                                        setconfirmMessage("Votre profil a été modifié");
                                    } else {
                                        setError(response.data);
                                    }
                                } catch (error) {
                                    console.error(error);
                                    setError("Une erreur inconnue s'est produite");
                                }
                            }}
                        >
                            <div className="inputs">
                                <TextField
                                    label="Pseudo"
                                    type="text"
                                    autoComplete="text"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                />
                                <TextField
                                    label="Adresse Email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <div className="buttonContainer">
                                <button type="submit" className="button-style button-color-validate">Modifier mon profil</button>
                            </div>
                        </form>
                        <p className="confirmMessage">{confirmMessage}</p>
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