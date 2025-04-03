import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface RoleField {
    username: string;
    email: string;
    gender: string;
    company: string;
    phone_number: string;
    status: number | null;
    roles: number[];
}
export interface RoleSearch extends Search, Pagenation {}
export interface RoleItem extends CommonTime, CommonUuid, CommonId, RoleField { }
export class Role implements RoleField {
    id: number;
    uuid: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    phone_number: string;
    status: number | null;
    gender: string;
    company: string;
    roles: number[];
    constructor() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.avatar = "";
        this.phone_number = "";
        this.status = null;
        this.company = "";
        this.gender = "";
        this.roles = [];
        this.id = 0
        this.uuid = ''// 初始化 roles 为一个空数组，或者根据需要设置默认值
    }
}