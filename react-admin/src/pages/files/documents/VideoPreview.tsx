import Dialog from '@/components/Dialog'
import './index.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
export default function VideoPreview(props: any) {
  const { visible, url, handleClose } = props
  const [scale, setScale] = useState(1)
  const handleMinus = () => {
    setScale(Number((scale - 0.2).toFixed(2)))
  }
  const handlePlus = () => {
    setScale(Number((scale + 0.2).toFixed(2)))
  }
  return (
    <Dialog
      open={visible}
      slot={
        <div className="VideoPreview">
          <ReactPlayer url={url} controls width="100%" height="100%" />
        </div>
      }
    ></Dialog>
  )
}
