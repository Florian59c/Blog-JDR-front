export interface DeleteModaleInterface {
    id: number;
    deleteType: string;
    setIsOpen: (open: boolean) => void;
    onSuccess?: () => void;
}
