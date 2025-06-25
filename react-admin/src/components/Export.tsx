import { Button } from "antd";
import { useState } from "react";
import {download} from '@/api/public'
export default function Export(props: any) {
  const {url, method, params, data} = props
  const [loading, setLoading] = useState(false)
  const handleDownload = async () => {
    setLoading(true)
    let filename = ''
    await download(props?.url, method)
      .finally(() => {
        setLoading(false)
      })
      .then((response) => {
        const headers = response?.headers
        const Disposition = headers.get('Content-Disposition')
        filename = Disposition?.split('=')[1]
        return response.blob()
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
  }
  return (
    <Button type="primary" loading={loading} iconPosition='start' onClick={ handleDownload}>
      导出EXCEL
    </Button>
  )
}
