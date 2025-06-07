import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface DictionaryField {
  type: string
  code: number | null
  label: string
}
export interface DictionarySearch extends Search, Pagenation {}
export interface DictionaryItem extends CommonTime, CommonUuid, CommonId, DictionaryField {}

export class Dictionary implements DictionaryItem {
  id: number | null
  uuid: string
  type: string
  code: number | null
  label: string
  constructor() {
    this.id = null,
    this.uuid = ''
    this.type = ''
    this.code = null
    this.label = ''
  }
}
