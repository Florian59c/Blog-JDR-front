import styles from '../styles/userComment.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { CommentsInterface } from '../interfaces/CommentsInterface';
import DeleteModale from "../modals/deleteModale";
import { Button, TextField } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import ReturnLink from '../components/returnLink';
import NotConnectedError from '../components/notConnectedError';

export default function UserComments() {
    const [isConnected, setIsConnected] = useState(false);
    const [comments, setComments] = useState<CommentsInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [content, setContent] = useState<{ [key: number]: string }>({});
    const [canModify, setCanModify] = useState<{ [key: number]: boolean }>({});
    const [error, setError] = useState('');

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
            setContent([]);
        }
    }

    async function handleModifyComment(e: React.FormEvent<HTMLFormElement>, commentId: number) {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}comment/modifyCommentByUser`,
                { content: content[commentId], commentId },
                { withCredentials: true }
            );

            if (response.status === 201 && response.data.message === 'Votre commentaire a bien été modifié') {
                setCanModify((prev) => ({ ...prev, [commentId]: false }));
                getCurrentUserComments(); // Rafraîchir les commentaires
            } else {
                setError(response.data?.message || 'Une erreur est survenue');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la modification du commentaire');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
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
                    <ReturnLink
                        links={[
                            { title: 'retourner sur la page de profil', href: '/profile' }
                        ]}
                    />
                    <div className="comments-block">
                        <h1>Mes commentaires</h1>
                        {comments.length === 0 ? (
                            <p className="comment-error-message">Vous n'avez pas encore écrit de commentaire</p>
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
                                                    <form onSubmit={(e) => handleModifyComment(e, comment.id)}>
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
                                                        <div className="button-container">
                                                            <Button type='submit' variant="outlined" color="success" endIcon={<SendIcon />}>
                                                                Modifier le commentaire
                                                            </Button>
                                                        </div>
                                                        {error && <p className="error-message">{error}</p>}
                                                    </form>
                                                ) : (
                                                    <p>{comment.content}</p>
                                                )}
                                            </div>
                                            <div className={styles.buttons}>
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    sx={{ width: '18rem' }}
                                                    startIcon={isEditing ? <EditOffOutlinedIcon /> : <EditOutlinedIcon />}
                                                    onClick={() =>
                                                        setCanModify((prev) => ({
                                                            ...prev,
                                                            [comment.id]: !isEditing
                                                        }))
                                                    }
                                                >
                                                    {isEditing ? "Ne plus modifier" : "Modifier"}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    sx={{ width: '18rem' }}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => {
                                                        setDeleteId(comment.id)
                                                        setIsOpen(true)
                                                    }}
                                                >
                                                    Supprimer mon commentaire
                                                </Button>
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
                <NotConnectedError />
            )
            }
        </div >
    );
}