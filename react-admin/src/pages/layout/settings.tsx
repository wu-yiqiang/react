import { Form, Input, Modal, Row, Col, Spin, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import { DialogProps, SystemStore } from '@/types/common'
import useSystemStore from '@/store/index'
import { useTranslation } from 'react-i18next'
const  SettingDialog = (props: any) => {
  const { open, handleClose } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { systemSetting, setSystemSetting } = useSystemStore() as SystemStore
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      setSystemSetting({
        ...systemSetting,
        lockTime: values?.lockTime,
        lockPassword: values?.lockPassword,
      });
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
    <Modal title={t('systemSetting')} width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={handleClose}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form
            id="form"
            form={form}
            labelAlign="right"
            labelCol={{
              style: { width: 170 }
            }}
            layout="inline"
          >
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Form.Item label={t('lockScreenTime')} name="lockTime" rules={requiredRules}>
                  <InputNumber placeholder={t('minute')} min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t('lockScreenPassword')} name="lockPassword" rules={requiredRules}>
                  <Input.Password placeholder={t('lockScreenTime')} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Spin>
    </Modal>
  )
}


export default SettingDialog;