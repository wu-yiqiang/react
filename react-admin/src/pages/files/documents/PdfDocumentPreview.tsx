import Dialog from '@/components/Dialog'
import './index.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { useRef, useState } from 'react'
import FilePreviewer from 'react-file-previewer'
export default function PdfDocumentPreview(props: any) {
  const { visible, url, handleClose } = props
  const pdfRef = useRef()
  const [scale, setScale] = useState(1)
  const handleMinus = () => {
    setScale(Number((scale - 0.2).toFixed(2)))
  }
  const handlePlus = () => {
    setScale(Number((scale + 0.2).toFixed(2)))
  }
  const handleDownload = () => {
  }
  return (
    <Dialog
      open={visible}
      slot={
        <div className="PdfDocumentPreview">
          <div className="topbar">
            <div className="toolbar">
              <div className="opt-icon" onClick={handleClose}>
                <SvgIcon name="close" size="36px" />
              </div>
            </div>
          </div>
          <div className="PreviewBox">
            <FilePreviewer ref={pdfRef} file={{ url: url }} hideControls />
          </div>
          <div className="bottombar">
            <div className="toolbar">
              {scale > 0.4 ? (
                <div className="opt-icon" onClick={handleMinus}>
                  <SvgIcon name="minus" size="24px" />
                </div>
              ) : (
                <SvgIcon name="minus-diabled" size="24px" />
              )}
              <div className="scale">{scale * 100 + '%'}</div>
              {scale < 2 ? (
                <div className="opt-icon" onClick={handlePlus}>
                  <SvgIcon name="plus" size="24px" />
                </div>
              ) : (
                <SvgIcon name="plus-diabled" size="24px" />
              )}
              <div className="opt-icon" onClick={handleDownload}>
                <SvgIcon name="download" size="24px" />
              </div>
            </div>
          </div>
        </div>
      }
    ></Dialog>
  )
}
