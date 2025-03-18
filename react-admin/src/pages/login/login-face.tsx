import { useEffect, useState } from 'react'
import './login.scss'
function LoginFace() {
  const [src, setSrc] = useState('')
  const open = async () => {
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    console.log('sadas', navigator.getMedia)
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      // ok, 浏览器支持它
      const constraints = {
        video: {
          width: 400,
          height: 190,
          facingMode: 'environment'
        }
      }
      const video = document.querySelector('#video')
      const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
      video.srcObject = videoStream
    }
  }
  useEffect(() => {
    open()
  }, [])
  return (
    <div className="LoginFace">
      <video id="video" autoPlay></video>
    </div>
  )
}

export default LoginFace
