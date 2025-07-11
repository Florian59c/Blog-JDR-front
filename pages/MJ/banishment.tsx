import { TextField } from '@mui/material';
import ReturnLink from '../../components/returnLink';
import styles from '../../styles/MJ/Banishment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PartialUserInterface } from '../../interfaces/PartialUserInterface';
import DeleteModale from '../../modals/deleteModale';
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

let debounceTimeout: NodeJS.Timeout;

export default function Banishment() {
    const [pseudo, setPseudo] = useState('');
    const [user, setUser] = useState<PartialUserInterface | null>(null);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    function handleSuccess() {
        alert("L'utilisateur a bien été banni.");
        setPseudo('');
        setUser(null);
        setDeleteId(0);
        setIsOpen(false);
    };

    useEffect(() => {
        // Ne fait rien si le champ est vide
        if (!pseudo.trim()) {
            setUser(null);
            setError('');
            return;
        }

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

        return () => clearTimeout(debounceTimeout);
    }, [pseudo, refreshTrigger]);

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
                {user &&
                    <div className='commentContainer comments-block'>
                        <p className={styles.title}>Utilisateur trouvé : </p>
                        <div className={styles.userContainer}>
                            <div>
                                <p><span className={styles.subTitle}>Email</span> : {user.email}</p>
                                <p><span className={styles.subTitle}>Pseudo</span> : {user.pseudo}</p>
                            </div>
                            <div className='button-container'>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => { setDeleteId(user.id); setIsOpen(true) }}
                                >
                                    Bannir l'utilisateur
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                {error && <p className={styles.message}>{error}</p>}
                {isOpen && <DeleteModale setIsOpen={setIsOpen} deleteType="ban" id={deleteId} onSuccess={handleSuccess} />}
            </div>
        </div>
    );
}