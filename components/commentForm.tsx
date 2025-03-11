import { CommentPropsInterface } from "../interfaces/CommentPropsInterface";

export default function CommentForm({ id, pageType }: CommentPropsInterface) {
    return (
        <div>
            <p>Formulaire de création de commentaires ici</p>
            <p>id : {id}</p>
            <p>page : {pageType}</p>
        </div>
    );
}