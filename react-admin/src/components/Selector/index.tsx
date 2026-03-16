import { Select } from "antd"
import { useEffect, useState } from "react"
import { ListTypes, listTypesRequest } from "./data"
import { ShopItem } from "@/types/shop"

export default function Selector(props: any) {
    const { type, value } = props
    const [options, setOptions] = useState<ShopItem | any>([])
    const init = async () => {
        let lists = []
        if (type === ListTypes.shops) {
            const { data } = await listTypesRequest[ListTypes.shops]()
            lists = data ?? []
        }
        setOptions(lists)
    }
    useEffect(() => {
        init()
    }, [type])
    return <>
        {
            options?.find((item: ShopItem) => item.id === value)?.name
        }
    </>
}
