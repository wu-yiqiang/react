import { getDictionaryItemByType } from "@/api/system"
import { DictionaryItem } from "@/types/dictionary"
import { useEffect, useState } from "react"

export default function TableCell(props: any) {
  const { type, value } = props
  const [dictionarys, setDictionarys] = useState<Array<DictionaryItem>>([])
  const init = async () => {
    const { data } = await getDictionaryItemByType(type)
    console.log('sdsd', data)
      setDictionarys(data ?? [])
    }
    useEffect(() => {
      init()
    }, [type])
  return <>{dictionarys?.length ? dictionarys?.find((item: DictionaryItem) => item.value === value)?.name : null}</>
}
