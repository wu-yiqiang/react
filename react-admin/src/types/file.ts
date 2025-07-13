import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface FileField {
  url: string
  file_name: string
  file_size?: string
  is_fold?: boolean
  parent_id: number | null
}
export interface FileSearch extends Search, Pagenation {}
export interface FileItem extends CommonTime, CommonUuid, CommonId, FileField {}

export class File implements FileItem {
  id: number | null
  uuid: string
  url: string
  file_name: string
  file_size?: string
  is_fold?: boolean
  parent_id: number | null
  constructor() {
    ;(this.id = null), (this.uuid = '')
    this.url = ''
    this.file_name = '新建文件夹'
    this.file_size = ''
    this.is_fold = true
    this.parent_id = null
  }
}
