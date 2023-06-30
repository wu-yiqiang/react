import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale/search-table';
import Download from '@/components/Download';
import FileUpload from '@/components/FileUpload';
import Dialog from '@/components/Dialog';
import TestButton from '@/pages/list/search-table/demo/TestButton';
function EditDialog(props) {
  const t = useLocale(locale);
  const [requestParams, setRequestParams] = useState({
    params1: 2312,
    params2: 1672,
  });
  const [requestData, setRequestData] = useState({
    data1: 11112,
    data2: 13342,
  });
  const close = () => {
    props.visibled(false);
  };
  function beforeDown() {
    setRequestParams({ params1: 90, params2: 45 });
  }

  return (
    <Modal
      title={t['editDialog.title']}
      visible={props.visible}
      onOk={() => close()}
      onCancel={() => close()}
      autoFocus={false}
      focusLock={true}
    >
      <TestButton />
      <Download
        type={'primary'}
        url={'/api-activity/getTemplate'}
        method={'post'}
        params={requestParams}
        data={requestData}
        beforeDownload={beforeDown}
      />
      <FileUpload method={'post'} />
    </Modal>
    // <Dialog />
  );
}
export default EditDialog;
