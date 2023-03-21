import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import { Button } from '@arco-design/web-react';
import locale from '@/locale';
import request from '@/utils/request';
import { IconArrowFall } from '@arco-design/web-react/icon';

function Download(props) {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(false);
  const {type, size, status, shape, method, axiosCnf, url, data, params} = props
  async function handleDownload() {
    setLoading(true);
    // 请求下载
    await request({
      url: url,
      method: method,
      data,
      params: params,
      config, axiosCnf,
      interceptors: {
        requestInterceptors(res) {
          console.log('接口请求拦截', res);
          return res;
        },
        responseInterceptors(result) {
          console.log('接口响应拦截', result);
          return result;
          
        },
      },
    });
    setLoading(false);
  }
  return (
    <Button
      type={type || 'text'}
      status={status}
      shape={shape || 'square'}
      icon={<IconArrowFall />}
      size={size}
      loading={loading}
      onClick={handleDownload}
    >
      {t['download.title']}
    </Button>
  );
}

export default Download;
