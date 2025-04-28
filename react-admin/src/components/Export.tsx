import { Button } from "antd";
import { useState } from "react";
import {download} from '@/api/public'
export default function Export(props: any) {
  const {url, method, params, data} = props
  const [loading, setLoading] = useState(false)
  const handleDownload = async () => {
    setLoading(true)
    const res = await download(props?.url, method,).finally(() => {
      setLoading(false)
    })
    const params = res?.headers
    const name = params['content-disposition']
    let filename = name?.split('=')
    const blob = new Blob([res?.data], { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename[1]
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }
  return (
    <Button type="primary" loading={loading} iconPosition='start' onClick={ handleDownload}>
      导出EXCEL
    </Button>
  )
}
