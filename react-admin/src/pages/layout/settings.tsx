import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { requiredRules } from '@/validator/index'
import { DialogProps, SystemStore } from '@/types/common'
import useSystemStore from '@/store/index'
export default function SettingDialog(props: DialogProps) {
  const { open, handleClose } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { systemSetting, setSystemSetting } = useSystemStore() as SystemStore
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      setSystemSetting(values)
      Toast.success('操作成功')
      handleClose()
    }
  }
  const init = () => {
    setLoading(true)
    form.setFieldsValue(systemSetting)
    setLoading(false)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal title="系统设置" width={400} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={handleClose}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form
            id="form"
            form={form}
            labelAlign="right"
            labelCol={{
              style: { width: 80 }
            }}
            layout="inline"
          >
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Form.Item label="锁屏时间" name="lockTime" rules={requiredRules}>
                  <InputNumber placeholder="分钟" min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="锁屏密码" name="lockPassword" rules={requiredRules}>
                  <Input.Password placeholder="密码" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Spin>
    </Modal>
  )
}
