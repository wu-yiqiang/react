import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import { Button } from '@arco-design/web-react';
import locale from '@/locale';
import request from '@/utils/request';
// interface Req {
// }
// interface Res { 
//   area: string 
//   areaCode: string 
//   areaid: string 
//   dayList: any[]
// }

function Download() {
  const t = useLocale(locale)
  const [loading, setLoading] = useState(false);
  function handleDownload() {
    setLoading(true);
  }
  async function get15DaysWeatherByArea(data) {
    return await request ({
      url: '/demo-api/api/xz/?code=654028207203',
      method: 'GET',
      data,
      interceptors: {
        requestInterceptors(res) {
          console.log('接口请求拦截', res)
          return res
        },
        responseInterceptors(result) {
          console.log('接口响应拦截', result)
          return result
        },
      },
    })
  }
  get15DaysWeatherByArea()
  return (
    <Button type='primary' loading={loading} onClick={handleDownload}>
      {t['download.title']}
    </Button>
  )
}

export default Download;