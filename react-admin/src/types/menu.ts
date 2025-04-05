import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface MenuField {
  name: string
  parent_id: number | null
  path: string
  component: string
  phone_number: string
  order_num: number | null
  menu_type: number | null
  perms: string
}
export interface MenuSearch extends Search, Pagenation {}
export interface MenuItem extends CommonTime, CommonUuid, CommonId, MenuField {}

export class Menu implements MenuItem {
  id: number
  uuid: string
  name: string
  parent_id: number | null
  path: string
  component: string
  phone_number: string
  order_num: number | null
  menu_type: number | null
  perms: string
  constructor() {
    this.id = 0,
    this.uuid = ''
    this.name = ''
    this.parent_id = null
    this.path = ''
    this.component = ''
    this.phone_number = ''
    this.order_num = null
    this.perms = ''
    this.menu_type = null
  }
}
