import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface DictionaryField {
  mappingValue: string
  mappingType: number | null
  name: string
}
export interface DictionarySearch extends Search, Pagenation {}
export interface DictionaryItem extends CommonTime, CommonUuid, CommonId, DictionaryField {}

export class Dictionary implements DictionaryItem {
  id: number | null
  uuid: string
  mappingValue: string
  mappingType: number | null
  name: string
  constructor() {
    this.id = null,
    this.uuid = ''
    this.mappingValue = ''
    this.mappingType = null
    this.name = ''
  }
}
