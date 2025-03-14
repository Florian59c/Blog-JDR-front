import styles from '../styles/deleteModale.module.css';
import Cancel from '../assets/img/cancel.png';
import { DeleteModaleInterface } from '../interfaces/DeleteModaleInterface';
import axios from 'axios';

export default function DeleteModale({ id, deleteType, setIsOpen }: DeleteModaleInterface) {

    async function handleDelete(id: number, deleteType: string) {
        try {
            const deleteRoutes: Record<string, string> = {
                user: "user/deleteUser",
                ban: "user/deleteUserByAdmin",
                comment: "comment/deleteCommentByUser",
                commentAdmin: "comment/deleteCommentByAdmin",
            };

            const route = deleteRoutes[deleteType];

            if (!route) {
                alert("Type de suppression invalide !");
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${route}`,
                deleteType === "user" ? {} : { id },
                { withCredentials: true }
            );

            if (response.data !== "ok") {
                alert(response.data);
            }

            setIsOpen(false);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert(error);
        }
    }

    return (
        <div className={styles.container} onClick={() => setIsOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.imgContainer}>
                    <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpen(false)} />
                </div>
                <div className={styles.text}>
                    <p>Etes vous sûr de vouloir supprimer votre compte ?</p>
                    <p className={styles.alert}>Attention ! La suppression est définitive !!</p>
                </div>
                <button
                    className="button-style button-color-error"
                    onClick={() => handleDelete(id, deleteType)}
                >
                    Supprimer mon compte
                </button>
            </div>
        </div>
    );
}