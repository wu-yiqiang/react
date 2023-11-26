import '@/style/Search.scss'
import { Button, Form, Input } from 'antd'
import { getUserInfo } from '@/api/sensor'
import { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
export default function Search(props:any) {
  const [form] = Form.useForm()
  const handleSearch = () => {
    console.log('sss')
  }
  const handleReset = () => {
    console.log('sss', getUserInfo({}))
  }
  const [status, setStatus] = useState(true)
  const items = [
    { type: 'input', label: '项目名称' },
    { type: 'input', label: '传感器名称' },
    { type: 'input', label: '项目名称' },
    { type: 'input', label: '项目名称' },
    { type: 'input', label: '项目名称' },
    { type: 'input', label: '项目名称' },
  ]
  const [displayItem, setDisplayItems] = useState([])
  const [hiddenItems, sethiddenItems] = useState([])
  const number = props.number ?? 3
  useEffect(() => {
    // const se = items.slice(0, number)
    // setDisplayItems(se)
    // const s = items.slice(number-1)
    // sethiddenItems(s)
    // console.log('item', se, items, new Date().getTime())
  }, [])
  
  return (
    <div className="Search">
      <Form form={form} className="form">
        {displayItem && displayItem.map((item) => {
          return (
            <Form.Item label={item.label} className="item">
              {item.type === 'input' ? <Input placeholder={item.label} /> : null}
            </Form.Item>
          )
        })}
        <div className="hidden">
          {hiddenItems &&
            hiddenItems.map((item) => {
              return (
                <Form.Item label={item.label} className="item">
                  {item.type === 'input' ? <Input placeholder={item.label} /> : null}
                </Form.Item>
              )
            })}
        </div>
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
          {status ? (
            <DownOutlined
              onClick={() => {
                setStatus(false)
              }}
            />
          ) : (
            <UpOutlined
              onClick={() => {
                setStatus(true)
              }}
            />
          )}
        </span>
      </div>
    </div>
  )
}
