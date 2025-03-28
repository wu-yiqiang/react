import { Pagenation, Search } from "./common";
export interface UserSearch extends Pagenation, Search {
    gender: string;
    company: string;
}