import { CommentsInterface } from "./CommentsInterface";

export interface JdrInterface {
    id: number;
    title: string;
    link: string;
    date: string | Date;
    is_scenario: boolean;
    comments: CommentsInterface[];
    jdr_list: {
        id: number;
        name: string;
    }
}