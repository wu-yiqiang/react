import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import { Button } from '@arco-design/web-react';
import locale from '@/locale';
import request from '@/utils/request';
import { IconArrowFall } from '@arco-design/web-react/icon';

function Download(props) {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(false);
  const { type, size, status, shape, method, axiosCnf, url, data, params, beforeDownload } =
    props;
  async function handleDownload() {
    setLoading(true);
    // 请求下载
    console.log('params', params);
    if (method == 'post') await request.post(url, params, data, axiosCnf).finally(() => {
      setLoading(false);
    });
    if (method == 'get') await request.get(url, params, axiosCnf).finally(() => {
      setLoading(false);
    });
  }
  function handleBeforeDownload() {
    if (beforeDownload) beforeDownload()
    handleDownload()
  }
  return (
    <Button
      type={type || 'text'}
      status={status || 'primary'}
      shape={shape || 'square'}
      icon={<IconArrowFall />}
      size={size || 'default'}
      loading={loading}
      onClick={handleBeforeDownload}
    >
      {t['download.title']}
    </Button>
  );
}

export default Download;
