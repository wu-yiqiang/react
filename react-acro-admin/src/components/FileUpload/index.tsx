import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale';
import { Upload, Message, Button } from '@arco-design/web-react';
import { IconUpload } from '@arco-design/web-react/icon';
import request from '@/utils/request';
function FileUpload({
  method = 'post',
  multiple = false,
  showUploadList = false,
  autoUpload = true,
  limit = 1,
  directory = false,
  url,
  params,
  data,
  axiosCnf,
}) {
  const t = useLocale(locale);
  // "init" | "uploading" | "done" | "error";
  const [status, setStatus] = useState('init');
  const [loading, setLoading] = useState(false);
  //  const t = useLocale(locale);
  //  const [loading, setLoading] = useState(false);
  //  function handleDownload() {
  //    setLoading(true);
  //  }
  function uploadOver() {
    // setStatus('done');
  }
  async function onSubmit() {
    setLoading(true);
    // 上传文件
    const formData = new FormData();
    if (method == 'post')
      await request.post(url, params, data, axiosCnf).finally(() => {
        setLoading(false);
      });
    if (method == 'get')
      await request.get(url, params, axiosCnf).finally(() => {
        setLoading(false);
      });
  }
  function handleBeforeUpload(file) {
    return new Promise((resolve, reject) => {});
  }
  function exceedLimit() {
    Message.warning(`超过上传数量限制！最多上传${limit}个`);
  }
  return (
    <Upload
      action="/"
      multiple={multiple}
      directory={directory}
      limit={multiple && limit}
      showUploadList={showUploadList}
      autoUpload={autoUpload}
      onExceedLimit={exceedLimit}
      beforeUpload={(file) => handleBeforeUpload(file)}
    >
      <Button
        type="primary"
        loading={loading}
        icon={<IconUpload />}
        onClick={(e) => {
          onSubmit();
        }}
      >
        {t['upload.title']}
      </Button>
    </Upload>
  );
}

export default FileUpload;
