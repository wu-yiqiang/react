import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { SetStateAction, useMemo, useState } from "react";
import PdfDocumentPreview from "./PdfDocumentPreview";
import VideoPreview from "./VideoPreview";

export default function FileItem(props: any) {
  const {url} = props
  let [visible, setVisible] = useState<boolean>(false)
  const handleStatue = (open: SetStateAction<boolean>) => {
    setVisible(open)
  }
  const handleOpen = () => {
    handleStatue(true)
  }
  const isVideo = useMemo(() => (url.includes('.mp4')), [url])
  const isPdf = useMemo(() => (url.includes('.pdf')), [url])
  const name = useMemo(() => {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }, [url])
  const handleClose = () => {
    handleStatue(false)
  }
  return (
    <>
      <div className="PdfDocument" onClick={handleOpen}>
        {isPdf ? <SvgIcon name="pdf" size="70px" /> : null}
        {isVideo ? <SvgIcon name="video" size="70px" /> : null}
        <div className="filename">{name}</div>
      </div>
      {isPdf && visible ? <PdfDocumentPreview visible={visible} url={url} handleClose={handleClose} /> : null}
      {isVideo && visible ? <VideoPreview visible={visible} url={url} handleClose={handleClose} /> : null}
    </>
  )
}
