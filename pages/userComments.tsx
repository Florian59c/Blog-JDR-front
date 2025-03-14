import styles from '../styles/userComment.module.css';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from '../assets/img/return-arrow.png';
import { CommentsInterface } from '../interfaces/CommentsInterface';
import DeleteModale from "../modals/deleteModale";

export default function UserComments() {
    const [isConnected, setIsConnected] = useState(false);
    const [comments, setComments] = useState<CommentsInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(0);

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
    }, []);

    return (
        <div>
            {isConnected ? (
                <div>
                    <Link href="/profile" className={styles.return}>
                        <img src={Arrow.src} alt="flèche" />
                        <p>retourner sur la page de profil</p>
                    </Link>
                    <div className='comments-block'>
                        <h1>Mes commentaires</h1>
                        {comments.length === 0 ? (
                            <p className="comment-error-message">Vous n'avez pas écrit de commentaire</p>
                        ) : (
                            <div>
                                {comments.map((comment) => {
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
                                                <p>{comment.content}</p>
                                            </div>
                                            <div className={styles.buttons}>
                                                <button className="button-style button-color-validate">Modifier</button>
                                                <button
                                                    className="button-style button-color-error"
                                                    onClick={() => { setDeleteId(comment.id); setIsOpen(true) }}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    )
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