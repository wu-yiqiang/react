import '@/style/Search.scss'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
export default function SearchForm(props: any) {
  const { searchOptions, defaultFoldNum = 5, defaultFoldState = true, handleSearch } = props
  const [foldState, setFoldState] = useState()
  const [form] = Form.useForm()
  const handleFold = () => {
    setFoldState(false)
  }
  const handleUnFold = () => {
    setFoldState(true)
  }
  const queryLists = () => {
    const data = form.getFieldsValue()
    console.log('ssds萨达萨达舒服舒服', data)
    // handleSearch(data)
  }
  const resetForm = () => {
    form.resetFields()
  }
  useEffect(() => {
    setFoldState(defaultFoldState)
  }, [])
  return (
    <>
      <Form form={form} layout="inline" style={{ '--numbers': defaultFoldNum }}>
        {searchOptions.map((item: object, index: number) => {
          return (
            <Form.Item label={item.label} name={item.prop} rules={item.rules} key={index} className={index + 1 > defaultFoldNum && foldState ? 'unfold' : 'fold'} initialValue={item.default}>
              {item.type == 'input' ? <Input {...item.attrs} defaultValue={item.default} /> : null}
              {item.type == 'select' ? <Select {...item.attrs} defaultValue={item.default} options={item.opts} /> : null}
            </Form.Item>
          )
        })}
        {searchOptions.length < defaultFoldNum ? (
          <Form.Item>
            <div className="inline-opts">
              <Button onClick={queryLists}>查询</Button>
              <Button onClick={resetForm}>重置</Button>
            </div>
          </Form.Item>
        ) : null}
      </Form>
      {searchOptions.length >= defaultFoldNum ? (
        <div className="opts">
          <Button onClick={queryLists}>查询</Button>
          <Button onClick={resetForm}>重置</Button>
          {searchOptions.length <= defaultFoldNum ? null : foldState ? <Button onClick={handleFold}>展开</Button> : <Button onClick={handleUnFold}>折叠</Button>}
        </div>
      ) : null}
    </>
  )
}
