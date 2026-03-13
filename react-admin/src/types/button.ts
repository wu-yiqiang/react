import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface BtnField {
  name: string
  code: string
}
export interface BtnSearch extends Search, Pagenation {}
export interface BtnItem extends CommonTime, CommonId, BtnField {}

export class Button implements BtnItem {
  id: number | null
  name: string
  code: string
  constructor() {
    (this.id = null),
    this.name = ''
    this.code = ''
  }
}
