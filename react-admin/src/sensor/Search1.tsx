import { Button, Form, Input, Select } from 'antd'
import { getUserInfo } from '@/api/sensor'
import React from 'react'
const { Option } = Select
export default function Search1() {
  const [form] = Form.useForm()
  const handleSearch = () => {
    console.log('sss')
  }
  const handleReset = () => {
    console.log('sss', getUserInfo({}))
  }
  return (
    <>
      <Form form={form}>
        <Form.Item label="项目名称">
          <Input placeholder="项目名称" />
        </Form.Item>
        <Form.Item label="传感器名">
          <Input placeholder="传感器名" />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleSearch}>
        搜索
      </Button>
      <Button type="primary" onClick={handleReset}>
        重置
      </Button>
    </>
  )
}
