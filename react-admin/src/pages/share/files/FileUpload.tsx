import { UploadOutlined, } from '@ant-design/icons'
import { Button, Upload, Input, Checkbox } from 'antd'
import {fileExtension, supportFilesArray, supportFileTypeString} from './data'
import Toast from '@/components/Toast'
import type { UploadProps } from 'antd'
import {uploadFile} from '@/api/share'
export default function FileUpload(props: any) {
  const { current_id, handleOk } = props
  const handleUpload = async (value: any) => {
    const formData = new FormData()
    formData.append('file', value?.file)
    current_id && formData.append('parent_id', current_id)
    await uploadFile(formData)
    Toast.success('上传成功')
    handleOk()
  }
  const beforeUpload = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const suffix = fileExtension(file?.name)
      if (!supportFilesArray.includes(suffix)) {
        Toast.error(`当前文件类型不支持上传`)
        reject()
        return Upload.LIST_IGNORE
      }
      resolve(true)
    })
  }
  return (
    <>
      <Upload accept={supportFileTypeString} showUploadList={false} beforeUpload={beforeUpload} customRequest={handleUpload}>
        <Button icon={<UploadOutlined />} type="primary">
          上传
        </Button>
      </Upload>
    </>
  )
}
