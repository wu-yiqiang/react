import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface RoleField {
  name: string
  code: string
  status: number | null
  remark: string
}
export interface RoleSearch extends Search, Pagenation {}
export interface RoleItem extends CommonTime, CommonUuid, CommonId, RoleField { }
export class Role implements RoleField {
  id: number | null
  name: string
  code: string
  remark: string
  status: number | null;
  constructor() {
    this.id = null
    this.name = ''
    this.code = ''
    this.remark = ''
    this.status = null
  }
}