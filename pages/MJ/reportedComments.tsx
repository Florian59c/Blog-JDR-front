import styles from '../../styles/MJ/reportedComments.module.css';
import { useEffect, useState } from "react";
import ReturnLink from "../../components/returnLink";
import { CommentsInterface } from "../../interfaces/CommentsInterface";
import axios from "axios";
import DeleteModale from "../../modals/deleteModale";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

export default function reportedComments() {
    const [comments, setComments] = useState<CommentsInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [error, setError] = useState('');

    async function cancelReportForComment(id: number) {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}comment/cancelReportForComment`,
                { id },
                { withCredentials: true }
            );
            await getReportedComments();
        } catch (error) {
            console.error('Error checking connection:', error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || 'Une erreur est survenue lors de l\'annulation du signalement du commentaire');
            } else {
                alert('Une erreur inconnue s\'est produite');
            }
        }
    }

    async function getReportedComments() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}comment/getReportedComments`,
                {
                    withCredentials: true,
                });
            setComments(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
            setComments([]);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'affichage des commentaires signalés');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    useEffect(() => {
        getReportedComments();
    }, [isOpen]);

    return (
        <div>
            <ReturnLink links={[{ title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' }]} />
            {comments.length !== 0 ? (
                <div className={styles.container}>
                    <h1>Liste des commentaires signalés :</h1>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className="commentContainer">
                                <div>
                                    <p>Commentaire ajouté par <span className="boldText">{comment.user.pseudo}</span>, le {new Date(comment.creation_date)
                                        .toLocaleDateString()} à {new Date(comment.creation_date)
                                            .toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })} :
                                    </p>
                                    <hr className={styles.border} />
                                    <p className={styles.content}>{comment.content}</p>
                                </div>
                                <div className={styles.buttons} >
                                    <Button variant="outlined" color="success" endIcon={<SendIcon />}
                                        onClick={() => cancelReportForComment(comment.id)}
                                    >
                                        Annuler le signalement
                                    </Button>
                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                        className="button-style button-color-error"
                                        onClick={() => { setDeleteId(comment.id); setIsOpen(true) }}
                                    >
                                        Supprimer le commentaire
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                    {isOpen && <DeleteModale setIsOpen={setIsOpen} deleteType="commentAdmin" id={deleteId} />}
                </div>
            ) : (
                <div className={styles.error}>
                    {
                        error ?
                            <p>{error}</p>
                            :
                            <p>Aucun commentaire signalé pour le moment ^^</p>
                    }
                </div >
            )
            }
        </div >
    );
}