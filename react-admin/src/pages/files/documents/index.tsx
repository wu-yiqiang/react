import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileItem from './FileItem'
import { Button, Upload, Input, Checkbox } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined } from '@ant-design/icons'
export default function DocumentManager() {
  return (
    <div className="Files">
      <div className="topbar">
        <Upload>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
        <Button icon={<FolderAddOutlined />}>新建文件夹</Button>
        <Button icon={<DeleteOutlined />}>删除</Button>
        <Button icon={<SwapOutlined />}>移动</Button>
        <Input placeholder="请输入" style={{ width: 200 }} prefix={<SearchOutlined />} />
      </div>
      <div className="Document">
        <FileItem url="http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf" />
        <FileItem url="http://192.168.1.222:8000/storage/netdisk/物体的缩放.mp4" />
        {new Array(100).fill(1)?.map(() => {
          return <FileItem url="http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf" />
        })}
      </div>
    </div>
  )
}
