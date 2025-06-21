import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileItem from './FileItem'
export default function DocumentManager() {
  return (
    <div className="Document">
      <FileItem url="http://192.168.1.222:8000/media/avatar/2022_PDF.pdf" />
      <FileItem url="http://192.168.1.222:8000/media/avatar/物体的缩放.mp4" />
    </div>
  )
}
