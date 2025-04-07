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
  const submitQuery = (value: any) => {
    // const data = form.getFieldsValue()  
    // handleSearch(data)
  }
  const resetForm = () => {
    form.resetFields()
  }
  const init = () => {
    searchOptions.forEach((item) => {
      initialValues[item.prop] = item.default
    });
  }
  useEffect(() => {
    setFoldState(defaultFoldState)
    init()
  }, [])
  return (
    <>
      <Form id="form" form={form} layout="inline" style={{ '--numbers': defaultFoldNum }} initialValues={initialValues} onFinish={submitQuery}>
        {searchOptions.map((item: object, index: number) => {
          return (
            <Form.Item key={Math.random()}  name={item.prop} label={item.label} rules={item.rules} className={index + 1 > defaultFoldNum && foldState ? 'unfold' : 'fold'}>
              {item.type == 'input' ? <Input {...item.attrs} /> : null}
              {item.type == 'select' ? <Select {...item.attrs} options={item.opts} /> : null}
            </Form.Item>
          )
        })}
        {searchOptions.length < defaultFoldNum ? (
          <Form.Item>
            <div className="inline-opts">
              <Button htmlType="submit">查询</Button>
              <Button onClick={resetForm}>重置</Button>
            </div>
          </Form.Item>
        ) : null}
        
      </Form>
      {searchOptions.length >= defaultFoldNum ? (
        <div className="opts">
          <Button form="form" htmlType="submit">查询</Button>
          <Button onClick={resetForm}>重置</Button>
          {searchOptions.length <= defaultFoldNum ? null : foldState ? <Button onClick={handleFold}>展开</Button> : <Button onClick={handleUnFold}>折叠</Button>}
        </div>
      ) : null}
    </>
  )
}
