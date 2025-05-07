import styles from '../styles/commentForm.module.css';
import { useState } from "react";
import { CommentPropsInterface } from "../interfaces/CommentPropsInterface";
import axios from "axios";
import { TextField } from "@mui/material";

export default function CommentForm({ id, pageType, onCommentAdded }: CommentPropsInterface & { onCommentAdded: () => void }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');

    return (
        <div className={styles.commentFormContainer}>
            <div className={styles.commentForm}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault(); // Empêche le rechargement de la page
                        setError('');
                        setconfirmMessage('');
                        try {
                            const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_SERVER_URL}comment/createComment`,
                                { content, postType: pageType, postId: id },
                                { withCredentials: true } // Nécessaire pour inclure les cookies
                            );
                            if (response.status === 201 && response.data.message === 'Votre commentaire a bien été créé') {
                                onCommentAdded(); // Déclenche la mise à jour de CommentList
                                setconfirmMessage(response.data.message);
                            } else {
                                setError(response.data);
                            }
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                // Si l'erreur provient d'Axios ou des dto
                                setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du commentaire');
                            } else {
                                setError('Une erreur inconnue s\'est produite');
                            }
                        }
                    }}
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="Contenu du commentaire"
                        multiline
                        rows={6}
                        type="text"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className={styles.commentButtonContainer}>
                        <button type="submit" className="button-style button-color-validate">Ajouter un commentaire</button>
                    </div>
                </form>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="confirmMessage">{confirmMessage}</p>
        </div>
    );
}