import styles from '../styles/commentList.module.css';
import { useEffect, useState } from "react";
import { CommentPropsInterface } from "../interfaces/CommentPropsInterface";
import { CommentsInterface } from "../interfaces/CommentsInterface";
import axios from "axios";
import Exclamation from "../assets/img/exclamation.png";
import { Tooltip } from '@mui/material';

export default function CommentList({ id, pageType, refreshComments }: CommentPropsInterface & { refreshComments: number }) {
    const [comments, setComments] = useState<CommentsInterface[]>([]);
    const [error, setError] = useState('');

    async function getComments() {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}comment/getCommentsByPost`,
                { postType: pageType, postId: id }
            )
            console.log(response.data);

            setComments(response.data);
        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'affichage des commentaires")
        }
    }

    useEffect(() => {
        getComments();
    }, [refreshComments]);

    return (
        <div>
            {comments.length === 0 ? (
                <p className={styles.errorMessage}>Ce post n'a pas de commentaire</p>
            ) : (
                <div className={styles.container}>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className={styles.commentContainer}>
                                <div className={styles.commentHeader}>
                                    <p>
                                        Créé par <span className={styles.boldText}>{comment.user.pseudo}</span>, le {new Date(comment.creation_date)
                                            .toLocaleDateString()} à {new Date(comment.creation_date)
                                                .toLocaleTimeString("fr-FR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                    </p>
                                    <Tooltip title="Signaler le commentaire" placement="top" arrow>
                                        <img src={Exclamation.src} alt="Signaler le commentaire" />
                                    </Tooltip>
                                </div>
                                <p className={styles.content}>{comment.content}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div >
    );
}