import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { SetStateAction, useMemo, useState } from "react";
import PdfDocumentPreview from "./PdfDocumentPreview";
import VideoPreview from "./VideoPreview";
import { Button, Upload, Input, Checkbox } from 'antd'
export default function FileItem(props: any) {
  const { fileItem, handleSelect, handleUnSelect, handleSelectPath } = props
  let [visible, setVisible] = useState<boolean>(false)
  const handleStatue = (open: SetStateAction<boolean>) => {
    setVisible(open)
  }
  const handleOpen = () => {
    if (isFold) {
      handleSelectPath(fileItem)
    } else {
      handleStatue(true)
    }
  }
  const isVideo = useMemo(() => fileItem?.file_name.includes('.mp4'), [fileItem])
  const isPdf = useMemo(() => fileItem?.file_name.includes('.pdf'), [fileItem])
  const isFold = useMemo(() => fileItem?.is_fold, [fileItem])
  const handleClose = () => {
    handleStatue(false)
  }
  const handleChange = (value: any) => {
    const checked = value?.target?.checked
    if (checked) handleSelect(fileItem?.id)
    if (!checked) handleUnSelect(fileItem?.id)
  }
  return (
    <>
      <div className="PdfDocument">
        <div className="file-checkbox">
          <Checkbox onChange={handleChange} />
          <div onClick={handleOpen}>
            {isPdf ? <SvgIcon name="pdf" size="70px" /> : null}
            {isVideo ? <SvgIcon name="video" size="70px" /> : null}
            {isFold ? <SvgIcon name="fold" size="70px" /> : null}
          </div>
        </div>
        <div className="filename">{fileItem?.file_name}</div>
      </div>
      {isPdf && visible ? <PdfDocumentPreview visible={visible} url={fileItem?.url} handleClose={handleClose} /> : null}
      {isVideo && visible ? <VideoPreview visible={visible} url={fileItem?.url} handleClose={handleClose} /> : null}
    </>
  )
}
