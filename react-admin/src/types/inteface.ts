import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface IntefaceField {
  name: string
  path: string
  type: number | null
}
export interface IntefaceSearch extends Search, Pagenation {}
export interface IntefaceItem extends CommonTime, CommonUuid, CommonId, IntefaceField {}

export class Inteface implements IntefaceItem {
  id: number | null
  uuid: string
  name: string
  path: string
  type: number | null
  constructor() {
    this.id = null
    this.uuid = ''
    this.name = ''
    this.path = ''
    this.type = null
  }
}
