import { Form, Modal, Spin, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import { postMenuItem, updateMenuItem } from '@/api/system'
import Toast from '@/components/Toast'
import ReactCrop, { type Crop } from 'react-image-crop'
// import 'react-image-crop/src/ReactCrop.scss'
import 'react-image-crop/dist/ReactCrop.css'

import { DialogProps } from '@/types/common'
export default function UpdateAvatarDialog(props: any) {
  const { open, handleClose, handleOk, image } = props
  const [title, setTitle] = useState('头像修改')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  })

  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields()
  }
  const init = () => {}
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal title={title} width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <div style={{ display: 'grid', placeContent: 'center' }}>
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1 / 1}>
              <img src={image} style={{ maxHeight: '300px' }} />
            </ReactCrop>
          </div>
        )}
      </Spin>
    </Modal>
  )
}
