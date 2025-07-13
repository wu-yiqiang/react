import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { SetStateAction, useMemo, useState } from "react";
import PdfDocumentPreview from "./PdfDocumentPreview";
import VideoPreview from "./VideoPreview";
import { Button, Upload, Image, Checkbox } from 'antd'
import { fileExtension, supportFiles } from './data'
import './index.scss'
export default function FileItem(props: any) {
  const { fileItem, handleSelect, handleUnSelect, handleSelectPath } = props
  const [visible, setVisible] = useState<boolean>(false)
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
  const isPdf = useMemo(() => fileItem?.file_name?.includes('.pdf'), [fileItem])
  const isVideo = useMemo(() => fileItem?.file_name?.includes('.mp4'), [fileItem])
  const isImage = useMemo(() => ['.png', '.jpeg', '.jpg', '.webp'].includes(fileExtension(fileItem?.file_name)?.toLowerCase()), [fileItem])
  const isFold = useMemo(() => fileItem?.is_fold, [fileItem])
  const iconName = useMemo(() => {
    if (fileItem?.is_fold) return 'fold'
    const icon = supportFiles.find((item) => item.fileSuffix == fileExtension(fileItem?.file_name)?.toLowerCase())?.icon
    return icon ?? 'unknow'
  }, [fileItem])
  const url = useMemo(() => {
    return import.meta.env.VITE_STORAGE_BASE_URL + fileItem?.url
  }, [fileItem])
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
        <div className="FileType">
          <div className="file-checkbox">
            <Checkbox onChange={handleChange} />
            <div onClick={handleOpen}>
              <SvgIcon name={iconName} size="70px" />
            </div>
          </div>
          <div className="filename">{fileItem?.file_name}</div>
        </div>
        {isPdf && visible ? <PdfDocumentPreview visible={visible} url={url} handleClose={handleClose} /> : null}
        {isVideo && visible ? <VideoPreview visible={visible} url={url} handleClose={handleClose} /> : null}
        {isImage && visible ? (
          <Image
            preview={{
              visible: visible,
              src: url,
              onVisibleChange: (value) => {
                setVisible(value)
              }
            }}
          />
        ) : null}
      </>
    )
}
