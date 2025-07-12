import { UploadOutlined, } from '@ant-design/icons'
import { Button, Upload, Input, Checkbox } from 'antd'
export default function FileUpload(props: any) {
  const { current_id } = props
  const handleUpload = () => {}
  return (
    <>
      <Upload showUploadList={false}>
        <Button icon={<UploadOutlined />} type="primary" onClick={handleUpload}>
          上传
        </Button>
      </Upload>
    </>
  )
}
