import '@/style/Search.scss'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
export default function SearchForm(props: any) {
  const { searchOptions, defaultFoldNum = 5, defaultFoldState = true } = props
  const [foldState, setFoldState] = useState()
  const handleFold = () => {
    setFoldState(false)
  }
  const handleUnFold = () => {
    setFoldState(true)
  }
  useEffect(() => {
    setFoldState(defaultFoldState)
  }, [])
  return (
    <>
      <Form layout='inline' style={{'--numbers': defaultFoldNum}}>
      {
        searchOptions.map((item: object, index: number) => {
          return (<Form.Item label={item.label} name={item.prop} rules={item.rules} key={ index} className={index + 1 > defaultFoldNum && foldState ? 'unfold formItem' : 'fold formItem'}>
              { item.type == 'input' ? <Input {...item.attrs} /> : null }
              { item.type == 'select' ? <Select {...item.attrs} options={item.opts} /> : null}
          </Form.Item>)
        })
      }
        {
          searchOptions.length < defaultFoldNum ? <Form.Item>
              <div className="inline-opts"><Button>查询</Button><Button>重置</Button></div>
          </Form.Item> : null
      }
      </Form>
      {
      searchOptions.length >= defaultFoldNum ?  <div className="opts"><Button>查询</Button><Button>重置</Button>{ foldState ? <Button onClick={handleFold}>展开</Button> : <Button onClick={handleUnFold}>折叠</Button>}</div> : null
    }
    </>
  )
}
