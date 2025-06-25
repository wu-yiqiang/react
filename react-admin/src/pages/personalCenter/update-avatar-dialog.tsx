import { Form, Modal, Spin, InputNumber, Button, Upload, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useSystemStore from '@/store/index'
import Toast from '@/components/Toast'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { updateUserAvatar } from '@/api/system'
import { upload } from '@/api/public'
import { SystemStore } from '@/types/common'
export default function UpdateAvatarDialog(props: any) {
  const { open, handleClose, handleOk, image } = props
  const [title, setTitle] = useState('Edit Avatar')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>()
  const [crop, setCrop] = useState<Crop>()

  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const userInfo = (useSystemStore.getState() as SystemStore)?.userInfo
    if (file) {
      setLoading(true)
      const { data } = await upload(file)
      await updateUserAvatar({
        id: userInfo?.id, avatar: data,
        uuid: '',
        username: '',
        email: '',
        gender: '',
        company: '',
        phone_number: '',
        status: null,
        roles: []
      })
      useSystemStore.setState(() => ({
        userInfo: { ...userInfo, avatar: data }
      }))
      setLoading(false)
    } else {
      await updateUserAvatar({
        id: userInfo?.id, avatar: img,
        uuid: '',
        username: '',
        email: '',
        gender: '',
        company: '',
        phone_number: '',
        status: null,
        roles: []
      })
      useSystemStore.setState(() => ({
        userInfo: { ...userInfo, avatar: img }
      }))
    }
    Toast.success('更新成功')
    handleClose()
  }
  const imageRef = useRef(null)

  const handleComplete = async (cro: any) => {
    if (imageRef.current && cro.width && cro.height) {
      const croppedImageBlob = await getCroppedImage(imageRef.current, crop) as any
      setFile(new File([croppedImageBlob], 'avatar.png', { type: 'image/jpeg' }))
    }
  }
  const getCroppedImage = (image: any, cro: any) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = cro.width
    canvas.height = cro.height
    const ctx = canvas.getContext('2d') as any
    ctx.drawImage(image, cro.x * scaleX, cro.y * scaleY, cro.width * scaleX, cro.height * scaleY, 0, 0, cro.width, cro.height)

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'image/jpeg',
        0.9
      ) // 格式和质量（0.9 = 90%）
    })
  }
  const init = () => {
    setImg(image)
  }
  const beforeUpload = (file: File) => {
    const fileType = file?.type
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      Toast.error('请上传 JPEG 或 PNG 格式的图片')
      return false
    }
    return true
  }
  const handleUpload = async (info: object) => {
    // @ts-ignore
    const file = info?.file
    const userInfo = (useSystemStore.getState() as SystemStore)?.userInfo
    setLoading(true)
    const { data } = await upload(file).finally(() => {
      setLoading(false)
    })
    setImg(data ?? '')
  }
  const handleSelect = () => {}
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal
      title={title}
      width={500}
      centered
      forceRender
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onOk={submit}
      onCancel={close}
      footer={
        <Space>
          <Button key="back" onClick={close}>
            Cancel
          </Button>
          <Upload name="avatar" accept=".jpg,.jpeg,.png" showUploadList={false} beforeUpload={(file: File) => beforeUpload(file)} maxCount={1} customRequest={handleUpload}>
            <Button type="primary" ghost loading={loading} onClick={handleSelect}>
              Select
            </Button>
          </Upload>
          <Button type="primary" loading={loading} onClick={submit}>
            Submit
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <div style={{ display: 'grid', placeContent: 'center' }}>
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1 / 1} onComplete={handleComplete}>
              <img src={img} ref={imageRef} crossOrigin="anonymous" style={{ maxHeight: '300px' }} />
            </ReactCrop>
          </div>
        )}
      </Spin>
    </Modal>
  )
}
