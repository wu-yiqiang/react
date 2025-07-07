import requestes from '@/network/request'
import { FileItem } from '@/types/file'
export const getFiles = async (id: number): Promise<any> => await requestes.Post('net_disk/current_files', { id: id })

export const createFold = async (data: FileItem): Promise<any> => await requestes.Post('net_disk/create_fold', data)

export const deleteFiles = async (data: number[]): Promise<any> => await requestes.Post('net_disk/delete', {files:data})
