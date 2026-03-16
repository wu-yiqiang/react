
import requestes from '@/network/request'
import { CommodityItem, CommoditySearch, CommodityField } from '@/types/commodity'
import { CommonId } from '@/types/common'
import { ShopItem, ShopSearch } from '@/types/shop'
import { ShopFilled } from '@ant-design/icons'

// 商品管理
export const getCommodityPages = async (data: CommoditySearch): Promise<any> => {
    return await requestes.Post('/commodity/page', data)
}

export const postCommodityItem = async (data: CommodityField): Promise<any> => {
    return await requestes.Post('/commodity/create', data)
}

export const deleteCommodityItem = async (id: number | null): Promise<any> => {
    if (!id) return
    return await requestes.Delete(`/commodity/delete/${id}`)
}

export const updateCommodityItem = async (data: CommodityItem): Promise<any> => {
    return await requestes.Post(`/commodity/update`, data)
}

export const getCommodityItem = async (id: number): Promise<any> => {
    if (!id) return
    return await requestes.Get(`/commodity/details/${id}`)
}

export const putCommodityUp = async (data: any): Promise<any> => {
    if (!data?.id) return
    return await requestes.Post(`/commodity/up`, data)
}

// 店铺管理
export const getShopPages = async (data: ShopSearch): Promise<any> => {
    return await requestes.Post('/shop/page', data)
}

export const getShopLists = async (): Promise<any> => {
    return await requestes.Post('/shop/list')
}
export const postShopItem = async (data: ShopItem): Promise<any> => {
    return await requestes.Post('/shop/create', data)
}

export const deleteShopItem = async (id: number | null): Promise<any> => {
    if (!id) return
    return await requestes.Delete(`/shop/delete/${id}`)
}

export const updateShopItem = async (data: ShopItem): Promise<any> => {
    return await requestes.Post(`/shop/update`, data)
}

export const getShopDetails = async (id: number): Promise<any> => {
    if (!id) return
    return await requestes.Get(`/shop/details/${id}`)
}

export const putShopUp = async (data: any): Promise<any> => {
    if (!data?.id) return
    return await requestes.Post(`/shop/up`, data)
}
