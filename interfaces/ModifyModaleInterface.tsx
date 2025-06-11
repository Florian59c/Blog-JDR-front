import { modifyDataInterface } from "./modifyDataInterface";

export interface ModifyModaleInterface {
    data: modifyDataInterface | null;
    modifyType: string;
    setIsOpenModify: (open: boolean) => void;
    onSuccess?: () => void;
}