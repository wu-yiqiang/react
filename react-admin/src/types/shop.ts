import { CommonTime, CommonUuid, CommonId, Search, Pagenation } from "@/types/common";
export interface ShopField {
    name: string
    status: number
    fileName: string
    shopAddress: string
    description: string
}
export interface ShopSearch extends Search, Pagenation { }
export interface ShopItem extends CommonTime, CommonId, ShopField { }


export class Shop implements ShopItem {
    id: number | null;
    name: string;
    shopAddress: string;
    status: number;
    fileName: string;
    description: string;
    constructor() {
        this.name = "";
        this.shopAddress = "";
        this.fileName = "";
        this.description = "";
        this.status = 0
        this.id = null
    }
}
