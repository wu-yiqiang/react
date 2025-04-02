import { commonItem }   from "@/types/common";
export interface userItem extends commonItem {
    username: string;
    email: string;
    gender: string;
    company: string;
    phone_number: string;
    status: string;
    roles: string[];
}