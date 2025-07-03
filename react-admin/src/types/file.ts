import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface FileField {
  url: string
  fileName: string
  fileSize: string
  isFold: boolean
}
export interface FileSearch extends Search, Pagenation {}
export interface FileItem extends CommonTime, CommonUuid, CommonId, FileField {}

export class File implements FileItem {
  id: number | null
  uuid: string
  url: string
  fileName: string
  fileSize: string
  isFold: boolean
  constructor() {
    ;(this.id = null), (this.uuid = '')
    this.url = ''
    this.fileName = '新建文件夹'
    this.fileSize = ''
    this.isFold = true
  }
}
