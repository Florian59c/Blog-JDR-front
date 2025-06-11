import styles from '../styles/deleteModale.module.css';
import Cancel from '../assets/img/cancel.png';
import { DeleteModaleInterface } from '../interfaces/DeleteModaleInterface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteModale({ id, deleteType, setIsOpen, onSuccess }: DeleteModaleInterface) {
    const router = useRouter();

    async function handleDelete(id: number, deleteType: string) {
        try {
            const deleteRoutes: Record<string, string> = {
                user: "user/deleteUser",
                ban: "user/deleteUserByAdmin",
                comment: "comment/deleteCommentByUser",
                commentAdmin: "comment/deleteCommentByAdmin",
                hero: "hero/deleteHero",
            };

            const route = deleteRoutes[deleteType];

            if (!route) {
                alert("Type de suppression invalide !");
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}${route}`,
                deleteType === "user" ? {} : { id },
                { withCredentials: true }
            );

            if (response.status === 201) {
                setIsOpen(false);

                // Appel de la fonction de succès si elle est fournie
                if (onSuccess) {
                    onSuccess();
                }

                if (deleteType === "user") {
                    router.push('/');
                }
            } else {
                alert(response.data.message || 'Erreur inconnue');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "Une erreur s'est produite lors de la suppression");
            } else {
                alert("Une erreur inconnue s'est produite");
            }
            console.error("Erreur lors de la suppression :", error);
        }
    }

    return (
        <div className={styles.container} onClick={() => setIsOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.imgContainer}>
                    <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpen(false)} />
                </div>
                <div className={styles.text}>
                    <p>Etes vous sûr de vouloir effectuer la suppression ?</p>
                    <p className={styles.alert}>Attention ! La suppression est définitive !!</p>
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: '15rem' }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(id, deleteType)}
                >
                    Supprimer
                </Button>
            </div>
        </div>
    );
}