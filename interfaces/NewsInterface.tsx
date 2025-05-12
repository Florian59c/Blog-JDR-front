export interface NewsInterface {
    id: number;
    title: string;
    link: string;
    date: string | Date;
    tag?: string;
}