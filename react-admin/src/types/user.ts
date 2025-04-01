import { Pagenation, Search } from "./common";
export interface UserSearch extends Pagenation, Search {
  // gender: string;
  // company: string;
}


export interface RoleSearch extends Pagenation, Search {
  departmeny: string
  company: string
}