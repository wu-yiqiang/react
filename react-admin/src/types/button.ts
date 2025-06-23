import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface BtnField {
  name: string
  code: string
}
export interface BtnSearch extends Search, Pagenation {}
export interface BtnItem extends CommonTime, CommonUuid, CommonId, BtnField {}

export class Btn implements BtnItem {
  id: number | null
  uuid: string
  name: string
  code: string
  constructor() {
    ;(this.id = null), (this.uuid = '')
    this.name = ''
    this.code = ''
  }
}
