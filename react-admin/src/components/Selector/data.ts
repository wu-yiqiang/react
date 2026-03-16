import { getShopLists } from "@/api/commodity"
export const enum ListTypes {
    shops = 'shops'
}
export const listTypesRequest = {
    [ListTypes.shops]: getShopLists
}