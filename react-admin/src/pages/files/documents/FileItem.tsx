import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { SetStateAction, useMemo, useState } from "react";
import PdfDocumentPreview from "./PdfDocumentPreview";
import VideoPreview from "./VideoPreview";
import { Button, Upload, Input, Checkbox } from 'antd'
export default function FileItem(props: any) {
  const {fileItem} = props
  let [visible, setVisible] = useState<boolean>(false)
  const handleStatue = (open: SetStateAction<boolean>) => {
    setVisible(open)
  }
  const handleOpen = () => {
    handleStatue(true)
  }
  const isVideo = useMemo(() => fileItem?.fileName.includes('.mp4'), [fileItem])
  const isPdf = useMemo(() => fileItem?.fileName.includes('.pdf'), [fileItem])
  const handleClose = () => {
    handleStatue(false)
  }
  return (
    <>
      <div className="PdfDocument" onClick={handleOpen}>
        {isPdf ? <SvgIcon name="pdf" size="70px" /> : null}
        {isVideo ? <SvgIcon name="video" size="70px" /> : null}
        <div className="filename">{fileItem?.fileName}</div>
      </div>
      {isPdf && visible ? <PdfDocumentPreview visible={visible} url={fileItem?.url} handleClose={handleClose} /> : null}
      {isVideo && visible ? <VideoPreview visible={visible} url={fileItem?.url} handleClose={handleClose} /> : null}
    </>
  )
}
