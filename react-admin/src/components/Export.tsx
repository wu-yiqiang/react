import { Button } from "antd";
import { useState } from "react";
import {download} from '@/api/public'
export default function Export(props: any) {
  const {url, method, params, data} = props
  const [loading, setLoading] = useState(false)
  const handleDownload = async () => {
    setLoading(true)
    await download(url, method, params, data).finally(() => {
      setLoading(false)
    })
  }
  return (
    <Button type="primary" loading={loading} iconPosition='start' onClick={ handleDownload}>
      导出EXCEL
    </Button>
  )
}
