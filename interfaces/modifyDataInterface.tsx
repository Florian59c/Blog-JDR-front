export interface modifyDataInterface {
    id: number;
    title: string;
    link: string;
    tag?: string;
    is_scenario?: boolean;
    jdr_list?: {
        id: number;
        name: string;
    };
}