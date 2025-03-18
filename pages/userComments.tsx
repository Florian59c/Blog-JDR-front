import styles from '../styles/userComment.module.css';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from '../assets/img/return-arrow.png';
import { CommentsInterface } from '../interfaces/CommentsInterface';
import DeleteModale from "../modals/deleteModale";
import { TextField } from '@mui/material';

export default function UserComments() {
    const [isConnected, setIsConnected] = useState(false);
    const [comments, setComments] = useState<CommentsInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [content, setContent] = useState<{ [key: number]: string }>({});
    const [canModify, setCanModify] = useState<{ [key: number]: boolean }>({});

    async function checkConnection() {
        try {
            const response = await axios.get('/api/checkIsConnected'); // Appeler l'API route
            setIsConnected(response.data.isConnected);
        } catch (error) {
            console.error('Error checking connection:', error);
            setIsConnected(false);
        }
    };

    async function getCurrentUserComments() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}comment/getCurrentUserComments`,
                {},
                {
                    withCredentials: true,
                });
            setComments(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
            // setError(error);
        }
    }

    useEffect(() => {
        checkConnection();
        getCurrentUserComments();
    }, [isOpen]);

    return (
        <div>
            {isConnected ? (
                <div>
                    <Link href="/profile" className={styles.return}>
                        <img src={Arrow.src} alt="flèche" />
                        <p>retourner sur la page de profil</p>
                    </Link>
                    <div className="comments-block">
                        <h1>Mes commentaires</h1>
                        {comments.length === 0 ? (
                            <p className="comment-error-message">Vous n'avez pas écrit de commentaire</p>
                        ) : (
                            <div>
                                {comments.map((comment) => {
                                    const isEditing = canModify[comment.id] || false;
                                    return (
                                        <div key={comment.id} className={`commentContainer ${styles.displayContent}`}>
                                            <div className={styles.content}>
                                                <p>Commentaire ajouté le {new Date(comment.creation_date)
                                                    .toLocaleDateString()} à {new Date(comment.creation_date)
                                                        .toLocaleTimeString("fr-FR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })} :
                                                </p>
                                                {isEditing ? (
                                                    <form
                                                    // onSubmit={async (e) => {
                                                    //     e.preventDefault(); // Empêche le rechargement de la page
                                                    //     setError('');
                                                    //     setconfirmMessage('');
                                                    //     try {
                                                    //         const response = await axios.post(
                                                    //             `${process.env.NEXT_PUBLIC_SERVER_URL}comment/createComment`,
                                                    //             { content, postType: pageType, postId: id },
                                                    //             { withCredentials: true } // Nécessaire pour inclure les cookies
                                                    //         );
                                                    //         if (response.data === "ok") {
                                                    //             onCommentAdded(); // Déclenche la mise à jour de CommentList
                                                    //             setconfirmMessage('Votre commentaire a bien été créé');
                                                    //         } else {
                                                    //             setError(response.data);
                                                    //         }
                                                    //     } catch (error) {
                                                    //         if (axios.isAxiosError(error)) {
                                                    //             // Si l'erreur provient d'Axios ou des dto
                                                    //             setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du commentaire');
                                                    //         } else {
                                                    //             setError('Une erreur inconnue s\'est produite');
                                                    //         }
                                                    //     }
                                                    // }}
                                                    >
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            multiline
                                                            rows={3}
                                                            type="text"
                                                            variant="outlined"
                                                            value={content[comment.id] || comment.content}
                                                            onChange={(e) =>
                                                                setContent({ ...content, [comment.id]: e.target.value })
                                                            }
                                                        />
                                                        <div className={styles.modifyButton}>
                                                            <button type="submit" className="button-style button-color-validate">
                                                                Modifier le commentaire
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <p>{comment.content}</p>
                                                )}
                                            </div>
                                            <div className={styles.buttons}>
                                                <button
                                                    className="button-style button-color-validate"
                                                    onClick={() =>
                                                        setCanModify((prev) => ({
                                                            ...prev,
                                                            [comment.id]: !isEditing
                                                        }))
                                                    }
                                                >
                                                    {isEditing ? "Ne plus modifier" : "Modifier"}
                                                </button>
                                                <button
                                                    className="button-style button-color-error"
                                                    onClick={() => { setDeleteId(comment.id); setIsOpen(true) }}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {isOpen && <DeleteModale setIsOpen={setIsOpen} deleteType="comment" id={deleteId} />}
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