import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface UserField {
  username: string
  email: string
  gender: string
  company: string
  phone_number: string
  status: number | null
  avatar: string
  roles: number[]
}
export interface UserSearch extends Search, Pagenation {}
export interface UserItem extends CommonTime, CommonUuid, CommonId, UserField { }

// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// export type A = MyPick<UserItem, 'username' | 'email'>

export class User implements UserItem {
  id: number | null;
  uuid: string;
  username: string;
  email: string;
  // password: string;
  avatar: string;
  phone_number: string;
  status: number | null;
  gender: string;
  company: string;
  roles: number[];
  constructor() {
    this.username = "";
    this.email = "";
    // this.password = "";
    this.avatar = "";
    this.phone_number = "";
    this.status = null;
    this.company = "";
    this.gender = "";
    this.roles = [];
    this.id = null
    this.uuid = ''
  }
}
