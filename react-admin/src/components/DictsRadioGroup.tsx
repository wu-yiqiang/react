import { getDictionaryItemByType } from '@/api/system'
import { DictionaryItem } from '@/types/dictionary'
import { Radio, RadioChangeEvent, Select } from 'antd'
import { useEffect, useState } from 'react'

export default function DictsSelector(props: any) {
  const { type, value, onChange } = props
  const [dictionarys, setDictionarys] = useState([])
  const handleSelect = (event: RadioChangeEvent) => {
    const values = event?.target?.value
    onChange(values)
  }
  const init = async () => {
    const { data } = await getDictionaryItemByType(type)
    const datas = data?.map((item: DictionaryItem) => {
      const iter = {...item, value: item?.mappingType}
      return iter
    }) ?? []
    setDictionarys(datas)
  }
  useEffect(() => {
    init()
  }, [type])
  return <>{dictionarys.length ? <Radio.Group value={value} options={dictionarys} onChange={handleSelect} /> : null}</>
}
