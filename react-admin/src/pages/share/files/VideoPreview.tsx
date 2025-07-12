import Dialog from '@/components/Dialog'
import './index.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
export default function VideoPreview(props: any) {
  const { visible, url, handleClose } = props
  const VideoPlayer = useRef(null)
  useEffect(() => {
    if (!visible) {
      console.log("sssss")
    }
  }, [visible])
  if (!visible) return null
  return (
    <Dialog open={visible} handleClose={handleClose}>
      <div className="VideoPreview">
        <ReactPlayer ref={VideoPlayer} url={url} stopOnUnmount={true} controls width="100%" height="100%" />
      </div>
    </Dialog>
  )
}
