import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileItem from './FileItem'
import { Button, Upload, Input, Checkbox } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from "react";
export default function DocumentManager() {
  const [files, setFiles] = useState([
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      isFold: false,
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/物体的缩放.mp4',
      fileName: '物体的缩放.mp4',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
    {
      url: 'http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf',
      fileName: '2022_PDF.pdf',
      fileSize: '120kb'
    },
  ])
  const handleCreateFold = () => {}
  return (
    <div className="Files">
      <div className="topbar">
        <Upload>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
        <Button icon={<FolderAddOutlined />} onClick={handleCreateFold}>新建文件夹</Button>
        <Button icon={<DeleteOutlined />}>删除</Button>
        <Button icon={<SwapOutlined />}>移动</Button>
        <Input placeholder="请输入" style={{ width: 200 }} prefix={<SearchOutlined />} />
      </div>
      <div className="Document">
        {files?.map((item) => {
          return <FileItem fileItem={item} />
        })}
      </div>
    </div>
  )
}
