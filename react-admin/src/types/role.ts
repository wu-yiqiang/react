import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface RoleField {
  name: string
    code: string
    remark: string
}
export interface RoleSearch extends Search, Pagenation {}
export interface RoleItem extends CommonTime, CommonUuid, CommonId, RoleField { }
export class Role implements RoleField {
  id: number | null
  name: string
  code: string
  remark: string
  constructor() {
    this.id = null
    this.name = ''
      this.code = ''
      this.remark = ''
  }
}