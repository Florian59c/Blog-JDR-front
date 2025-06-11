import styles from '../styles/modifyModale.module.css';
import Cancel from '../assets/img/cancel.png';
import { ModifyModaleInterface } from '../interfaces/ModifyModaleInterface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

export default function ModifyModale({ data, modifyType, setIsOpenModify, onSuccess }: ModifyModaleInterface) {
    const router = useRouter();

    if (!data) {
        return (
            <div className={styles.container} onClick={() => setIsOpenModify(false)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.imgContainer}>
                        <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpenModify(false)} />
                    </div>
                    <p className={`${styles.text} ${styles.alert}`}>
                        Une erreur est survenue ! Aucune donnée n'a été trouver pour effectuer la modification !!
                    </p>
                </div>
            </div>
        );
    }

    // async function handleDelete(id: number, modifyType: string) {
    //     try {
    //         const deleteRoutes: Record<string, string> = {
    //             hero: "hero/updateHero",
    //         };

    //         const route = deleteRoutes[modifyType];

    //         if (!route) {
    //             alert("Type de modification invalide !");
    //             return;
    //         }

    //         const response = await axios.post(
    //             `${process.env.NEXT_PUBLIC_SERVER_URL}${route}`,
    //             modifyType === "user" ? {} : { id },
    //             { withCredentials: true }
    //         );

    //         if (response.status === 201) {
    //             setIsOpenModify(false);

    //             // Appel de la fonction de succès si elle est fournie
    //             if (onSuccess) {
    //                 onSuccess();
    //             }

    //             if (modifyType === "user") {
    //                 router.push('/');
    //             }
    //         } else {
    //             alert(response.data.message || 'Erreur inconnue');
    //         }
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             alert(error.response?.data?.message || "Une erreur s'est produite lors de la suppression");
    //         } else {
    //             alert("Une erreur inconnue s'est produite");
    //         }
    //         console.error("Erreur lors de la suppression :", error);
    //     }
    // }

    return (
        <div className={styles.container} onClick={() => setIsOpenModify(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.imgContainer}>
                    <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpenModify(false)} />
                </div>
                formulaires ici
                {/* <div className={styles.text}>
                    <p>Etes vous sûr de vouloir effectuer la suppression ?</p>
                    <p className={styles.alert}>Attention ! La suppression est définitive !!</p>
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: '15rem' }}
                    startIcon={<DeleteIcon />}
                // onClick={() => handleDelete(id, modifyType)}
                >
                    salut tout le monde
                </Button> */}
            </div>
        </div>
    );
}