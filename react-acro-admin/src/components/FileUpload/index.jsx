import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale';
import { Upload } from '@arco-design/web-react';
function FileUpload(props) {
  const {multiple, showUploadList } = props
//  const t = useLocale(locale);
//  const [loading, setLoading] = useState(false);
//  function handleDownload() {
//    setLoading(true);
//  }
  return (<Upload action='/'  multiple={multiple || false} showUploadList={showUploadList || false} autoUpload={true}/>);
}

export default FileUpload;
