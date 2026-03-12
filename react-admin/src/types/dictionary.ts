import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface DictionaryField {
  value: string
  code: number | null
  name: string
}
export interface DictionarySearch extends Search, Pagenation {}
export interface DictionaryItem extends CommonTime, CommonUuid, CommonId, DictionaryField {}

export class Dictionary implements DictionaryItem {
  id: number | null
  uuid: string
  value: string
  code: number | null
  name: string
  constructor() {
    this.id = null,
    this.uuid = ''
    this.value = ''
    this.code = null
    this.name = ''
  }
}
