import { CommentFormPropsInterface } from "../interfaces/CommentFormPropsInterface";

export default function CommentForm({ postId, pageType }: CommentFormPropsInterface) {
    return (
        <div>
            <p>Formulaire de création de commentaires ici</p>
            <p>id : {postId}</p>
            <p>page : {pageType}</p>
        </div>
    );
}