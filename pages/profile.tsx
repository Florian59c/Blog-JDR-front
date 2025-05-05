import styles from '../styles/profile.module.css';
import { TextField } from "@mui/material";
import axios from "axios";
import classNames from 'classnames';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteModale from "../modals/deleteModale";

export default function Profile() {
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
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'affichage de vos informations personnelles');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
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
                    <div className={classNames(styles.btn, styles.btnLogout)}>
                        <Link href="/userComments">
                            <button className="button-style button-color-validate">
                                Voir mes commentaires
                            </button>
                        </Link>
                        <button
                            className="button-style button-color-validate"
                            onClick={async () => {
                                try {
                                    await axios.post(
                                        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`,
                                        {},
                                        { withCredentials: true }
                                    );

                                    router.push('/login');
                                } catch (error) {
                                    console.error('Erreur lors de la déconnexion :', error);
                                    alert('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
                                }
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
                                    if (axios.isAxiosError(error)) {
                                        setError(error.response?.data?.message || 'Une erreur est survenue lors de la modification de votre profil');
                                    } else {
                                        setError('Une erreur inconnue s\'est produite');
                                    }
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
                            <div className="buttonContainer">
                                <button type="submit" className="button-style button-color-validate">Modifier mon profil</button>
                            </div>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        <p className="confirmMessage">{confirmMessage}</p>
                    </div>
                    <div className={classNames(styles.btn, styles.btnDelete)}>
                        <button
                            className="button-style button-color-error"
                            onClick={() => setIsOpen(true)}
                        >
                            Supprimer mon compte
                        </button>
                    </div>
                    {isOpen && <DeleteModale setIsOpen={setIsOpen} deleteType="user" id={0} />}
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