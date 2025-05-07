export interface JdrNamesInterface {
    id: number;
    name: string;
    jdr: {
        id: number;
        title: string;
        link: string;
        date: string | Date;
        is_scenario: boolean;
    }[];
}