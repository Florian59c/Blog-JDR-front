import styles from '../styles/profile.module.css';
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteModale from "../modals/deleteModale";
import NotConnectedError from '../components/notConnectedError';

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
                    <div className={styles.btnDouble}>
                        <Link href="/userComments">
                            <Button variant="outlined" color="success" sx={{ width: '18rem' }} endIcon={<SpeakerNotesOutlinedIcon />}>
                                Voir mes commentaires
                            </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ width: '18rem' }}
                            endIcon={<LogoutOutlinedIcon />}
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
                        </Button>
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
                                    );

                                    if (response.status === 201 && response.data.message === 'Votre profil a bien été modifié') {
                                        setconfirmMessage(response.data.message);
                                    } else {
                                        setError(response.data.message || 'Une erreur est survenue lors de la modification de votre profil');
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
                            <div className="button-container">
                                <Button type='submit' variant="outlined" color="success" endIcon={<SendIcon />}>Modifier mon profil</Button>
                            </div>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        <p className="confirmMessage">{confirmMessage}</p>
                    </div>
                    <div className={styles.btnDelete}>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => setIsOpen(true)}
                        >
                            Supprimer mon compte
                        </Button>
                    </div>
                    {isOpen && <DeleteModale setIsOpen={setIsOpen} deleteType="user" id={0} />}
                </div>
            ) : (
                <NotConnectedError />
            )}
        </div>
    );
}