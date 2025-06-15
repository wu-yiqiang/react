import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { SetStateAction, useState } from "react";
import PdfDocumentPreview from "./PdfDocumentPreview";

export default function PdfDocument() {
  let [visible, setVisible] = useState<boolean>(false)
  const handleStatue = (open: SetStateAction<boolean>) => {
    console.log('sss', open)
    setVisible(open)
  }
  const handleOpen = () => {
    handleStatue(true)
  }
  const handleClose = () => {
    handleStatue(false)
  }
  return (
    <>
    <div className="PdfDocument" onClick={handleOpen}>
      <SvgIcon name="pdf" size="70px" />
      <div className="filename">动荡的世界.pdf</div>
    </div>
      {visible ? <PdfDocumentPreview visible={visible} url="http://192.168.1.222:8000/media/avatar/2022_PDF.pdf" handleClose={handleClose} /> : null}
    </>
  )
}
