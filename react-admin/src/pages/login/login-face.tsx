import { useEffect, useState } from 'react'
import './login.scss'
function LoginFace() {
  // const [src, setSrc] = useState('')
  const open = async () => {
// 由于现代浏览器已弃用 getUserMedia 等旧方法，这里移除该赋值逻辑，因为后续使用的是标准的 mediaDevices.getUserMedia
// 所以这行代码可以直接注释掉或删除，为了保持结构，这里注释掉
// navigator.getMedia = navigator?.getUserMedia || navigator?.webkitGetUserMedia || navigator?.mozGetUserMedia || navigator?.msGetUserMedia;
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
      if (video instanceof HTMLVideoElement) {
        video.srcObject = videoStream;
      }
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
