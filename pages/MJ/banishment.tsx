import { TextField } from '@mui/material';
import ReturnLink from '../../components/returnLink';
import styles from '../../styles/MJ/Banishment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PartialUserInterface } from '../../interfaces/PartialUserInterface';

let debounceTimeout: NodeJS.Timeout;

export default function Banishment() {
    const [pseudo, setPseudo] = useState('');
    const [user, setUser] = useState<PartialUserInterface | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Ne fait rien si le champ est vide
        if (!pseudo.trim()) {
            setUser(null);
            setError('');
            return;
        }

        // Déclenche la requête avec un délai (300ms)
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}user/findUserByPseudo`,
                    { pseudo },
                    { withCredentials: true }
                );
                setUser(response.data);
                setError('');
            } catch (error) {
                setUser(null);
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || 'Erreur lors de la récupération de l\'utilisateur');
                } else {
                    setError('Erreur inconnue');
                }
            }
        }, 300);

        // Nettoyage
        return () => clearTimeout(debounceTimeout);
    }, [pseudo]);

    return (
        <div>
            <ReturnLink links={[{ title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' }]} />
            <div className={`blockContainer ${styles.container}`}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        label="Pseudo de l'utilisateur"
                        type="text"
                        variant='standard'
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        fullWidth
                    />
                </form>
                {user && <p>Email : {user.email}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}