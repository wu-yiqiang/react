import Dialog from '@/components/Dialog'
import './index.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { InputNumber } from 'antd'
import { number } from 'echarts'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
export default function PdfDocumentPreview(props: any) {
  const { visible, url, handleClose } = props
  const initWidth = 1000
  const [totalPages, setTotalPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(initWidth)
  const [pageNumber, setPageNumber] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(1)
  const handleMinus = () => {
    setScale(Number((scale - 0.2).toFixed(2)))
  }
  const handlePlus = () => {
    console.log('11', scale)
    setScale(Number((scale + 0.2).toFixed(2)))
  }
  function onDocumentLoadSuccess(value: any) {
    const { numPages } = value
    setTotalPages(numPages)
    setLoaded(true)
  }
  const handleNextPage = () => { 
    setPageNumber(pageNumber + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1)
  }
  const onChangePage = (value: number | null) => {
    if (!number) return
    setPageNumber(value as number)
  }
  useEffect(() => {
    console.log("sdsd", scale)
    setPageWidth(initWidth * scale)
  }, [scale])
  const handleDownload = () => {}
  if (!visible) return null
  return (
    <Dialog open={visible} handleClose={handleClose}>
      <div className="PdfDocumentPreview">
        <div className="topbar">
          <div className="bottombar">
            {loaded ? (
              <div className="toolbar">
                {pageNumber <= 1 ? (
                  <SvgIcon name="pre-page-disabled" size="24px" />
                ) : (
                  <div className="opt-icon" onClick={handlePreviousPage}>
                    <SvgIcon name="pre-page" size="24px" />
                  </div>
                )}
                <div className="numbers">
                  <InputNumber min={1} max={totalPages} value={pageNumber} onChange={onChangePage} /> / {totalPages}
                </div>
                {pageNumber >= totalPages ? (
                  <SvgIcon name="next-page-disabled" size="24px" />
                ) : (
                  <div className="opt-icon" onClick={handleNextPage}>
                    <SvgIcon name="next-page" size="24px" />
                  </div>
                )}
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
                {/* <div className="opt-icon" onClick={handleDownload}>
                  <SvgIcon name="download" size="24px" />
                </div> */}
              </div>
            ) : null}
          </div>
          <div className="toolbar">
            <div className="opt-icon" onClick={handleClose}>
              <SvgIcon name="close" size="36px" />
            </div>
          </div>
        </div>
        <div className="PreviewBox">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer={false} loading={'加载中...'} />
          </Document>
        </div>
      </div>
    </Dialog>
  )
}
