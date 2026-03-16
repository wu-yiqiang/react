import { getDictionaryItemByType } from "@/api/system"
import { Select } from "antd"
import { useEffect, useState } from "react"

export default function DictsSelector(props: any) {
  const { type, value, onChange } = props
  const [dictionarys, setDictionarys] = useState([])
  const handleSelect = (value: number) => {
    onChange(value)
  }
  const init = async () => {
      const { data } = await getDictionaryItemByType(type)
      setDictionarys(data ?? [])
    }
    useEffect(() => {
      init()
    }, [type])
  return <Select value={value} options={dictionarys} fieldNames={{ label: 'name', value: 'mappingValue' }} onSelect={handleSelect}></Select>
}
