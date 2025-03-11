import { CommentPropsInterface } from "../interfaces/CommentPropsInterface";

export default function CommentList({ id, pageType }: CommentPropsInterface) {
    return (
        <div>
            <p>Liste des commentaires ici</p>
            <p>id : {id}</p>
            <p>page : {pageType}</p>
        </div>
    );
}