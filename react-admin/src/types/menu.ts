import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface MenuField {
  name: string
  parent_id: number | null
  path: string
  phone_number: string
  order_num: number | null
  menu_type: number | null
  code: string
}
export interface MenuSearch extends Search, Pagenation {}
export interface MenuItem extends CommonTime, CommonUuid, CommonId, MenuField {}

export class Menu implements MenuItem {
  id: number | null
  uuid: string
  name: string
  parent_id: number | null
  path: string
  phone_number: string
  order_num: number | null
  menu_type: number | null
  code: string
  constructor() {
    ;(this.id = null), (this.uuid = '')
    this.name = ''
    this.parent_id = null
    this.path = ''
    this.phone_number = ''
    this.order_num = null
    this.code = ''
    this.menu_type = null
  }
}
