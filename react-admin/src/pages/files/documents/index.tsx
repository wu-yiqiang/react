import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileItem from './FileItem'
import { Button, Upload } from "antd";
import { FolderAddOutlined, UploadOutlined } from "@ant-design/icons";
export default function DocumentManager() {
  return (
    <>
      <div className="topbar">
        <Upload>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
        <Button icon={<FolderAddOutlined />}>新建文件夹</Button>
      </div>
      <div className="Document">
        <FileItem url="http://192.168.1.222:8000/storage/netdisk/2022_PDF.pdf" />
        <FileItem url="http://192.168.1.222:8000/storage/netdisk/物体的缩放.mp4" />
      </div>
    </>
  )
}
