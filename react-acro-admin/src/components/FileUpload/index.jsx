import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import { Button } from '@arco-design/web-react';
import locale from '@/locale';
// import { IconPlus } from '@arco-design/web-react/icon';



function FileUpload() {
    const t = useLocale(locale)
    const [loading, setLoading] = useState(false);
    function handleDownload() {
        setLoading(true);
    }
    return  (
        <Button type='primary' loading={loading}  onClick={handleDownload}>
          {t['download.title']}
        </Button>
    )
  }


  export default FileUpload;