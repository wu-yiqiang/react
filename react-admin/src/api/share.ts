import requestes from '@/network/request'
import { FileItem } from '@/types/file'
export const getFiles = async (id: number | null): Promise<any> => await requestes.Post('net_disk/current_files', { id: id })

export const createFold = async (data: FileItem): Promise<any> => await requestes.Post('net_disk/create_fold', data)

export const deleteFiles = async (data: number[]): Promise<any> => await requestes.Post('net_disk/delete', { files: data })

export const getDirTree = async (): Promise<any> => await requestes.Get('net_disk/tree_list')

export const updateFileItem = async (data: object): Promise<any> => await requestes.Post('net_disk/batch_update', data)

export const uploadFile = async (data: object): Promise<any> => await requestes.Post('net_disk/upload', data)

