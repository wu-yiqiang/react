import '@/style/Search.scss'
import { Button, Form, Input } from 'antd'
import { getUserInfo } from '@/api/sensor'
import { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
export default function Search(props:any) {
  const [form] = Form.useForm()
  const handleSearch = () => {
    console.log('sss', form.getFieldValue)
  }
  const handleReset = () => {
    formRef.current!.resetFields()
  }
  const [foldStatus, setFoldStatus] = useState(true)
  const items = props.fields ?? []
  const [displayItem, setDisplayItems] = useState([])
  const [hiddenItems, sethiddenItems] = useState([])
  const number = props.number ?? 3
  const foldItems = () => {
    const se = items.slice(0, number )
    setDisplayItems(se)
    const s = items.slice(number)
    sethiddenItems(s)
    // console.log('item', se, items, new Date().getTime())
  }
  const unFoldItems = () => {
    setDisplayItems([...items])
    sethiddenItems([])
    console.log('sss', hiddenItems, displayItem)
  }
  useEffect(() => {
    foldItems()
  }, [])
  
  return (
    <div className="Search">
      <Form form={form} ref={form} className="form">
        {displayItem.map((item) => {
          return (
            <Form.Item label={item.label} className="item" key={item.label}>
              {item.type === 'input' ? <Input placeholder={item.label} /> : null}
            </Form.Item>
          )
        })}
        <span className={foldStatus ? 'searchFold' : 'searchUnfold'}>
          {hiddenItems.map((item) => {
            return (
              <Form.Item label={item.label} className="item" key={item.label}>
                {item.type === 'input' ? <Input placeholder={item.label} /> : null}
              </Form.Item>
            )
          })}
        </span>
      </Form>
      <div className="opts">
        <Button type="primary" onClick={handleSearch}>
          搜索
        </Button>
        <Button type="primary" onClick={handleReset}>
          重置
        </Button>
      </div>
      <div className="fold">
        <span className="foldIcon">
          {foldStatus ? (
            <DownOutlined
              onClick={() => {
                setFoldStatus(false)
                unFoldItems()
              }}
            />
          ) : (
            <UpOutlined
              onClick={() => {
                setFoldStatus(true)
                foldItems()
              }}
            />
          )}
        </span>
      </div>
    </div>
  )
}
