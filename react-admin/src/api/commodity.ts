
import requestes from '@/network/request'
import { CommodityItem, CommoditySearch, CommodityField } from '@/types/commodity'

// 商品管理
export const getCommodityPages = async (data: CommoditySearch): Promise<any> => {
    return await requestes.Post('/commodity/page', data)
}

export const postCommodityItem = async (data: CommodityField): Promise<any> => {
    return await requestes.Post('/commodity/create', data)
}

export const deleteCommodityItem = async (id: number): Promise<any> => {
    if (!id) return
    return await requestes.Delete(`/commodity/delete/${id}`)
}

export const updateCommodityItem = async (data: CommodityItem): Promise<any> => {
    return await requestes.Post(`/commodity/update`, data)
}

export const getCommodityItem = async (id: number): Promise<any> => {
    return await requestes.Get(`/commodity/details/${id}`)
}

export const putCommodityUp = async (id: number): Promise<any> => {
    return await requestes.Post(`/commodity/up/${id}`)
}