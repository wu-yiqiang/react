import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface CommodityField {
    name: string
    code: string
    shopId: number | null
    price: number
    sales: number
    inventory: number
    status: number
    fileName: string
    description: string
}
export interface CommoditySearch extends Search, Pagenation { }
export interface CommodityItem extends CommonTime, CommonId, CommodityField { }


export class Commodity implements CommodityItem {
    id: number | null;
    name: string;
    code: string;
    shopId: number | null
    price: number;
    sales: number;
    inventory: number;
    status: number;
    fileName: string;
    description: string;
    constructor() {
        this.name = "";
        this.code = "";
        this.shopId = null;
        this.price = 0;
        this.sales = 0;
        this.inventory = 0;
        this.fileName = "";
        this.description = "";
        this.status = 0
        this.id = null
    }
}
