import { Button, Form, Input, Select } from 'antd'
import type { FormInstance } from 'antd/es/form'
import React from 'react'
import { Col, Row } from 'antd'
const { Option } = Select
export default function Search1() {
  const [form] = Form.useForm()
  const onGenderChange = () => {}
  return (
    <>
      <Form form={form}>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Form Layout" name="layout">
          <Select placeholder="Select a option and change input text above" onChange={onGenderChange} allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Form>
      <Button type="primary">搜索</Button>
      <Button type="primary">重置</Button>
    </>
  )
}
