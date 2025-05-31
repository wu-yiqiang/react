import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface IntefaceField {
  name: string
  path: string
  type: number | null
}
export interface IntefaceSearch extends Search, Pagenation {}
export interface IntefaceItem extends CommonTime, CommonUuid, CommonId, IntefaceField {}

export class Inteface implements Omit<IntefaceItem,'id' | 'uuid'> {
  name: string
  path: string
  type: number | null
  constructor() {
    this.name = ''
    this.path = ''
    this.type = null
  }
}
