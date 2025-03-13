import { useEffect, useState } from "react";
import { CommentPropsInterface } from "../interfaces/CommentPropsInterface";
import { CommentsInterface } from "../interfaces/CommentsInterface";
import axios from "axios";

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
                <p>Ce post n'a pas de commentaire</p>
            ) : (
                <div>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <p>
                                    Créé le {new Date(comment.creation_date).toLocaleDateString()} à {new Date(comment.creation_date).
                                        toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                </p>
                                <p>{comment.user.pseudo}</p>
                                <p>{comment.content}</p>
                            </div>
                        )
                    })}
                </div>
            )
            }
        </div >
    );
}