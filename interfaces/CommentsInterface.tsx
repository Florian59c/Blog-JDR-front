export interface CommentsInterface {
    id: number;
    content: string;
    creation_date: string | Date;
    user: {
        pseudo: string;
    };
}