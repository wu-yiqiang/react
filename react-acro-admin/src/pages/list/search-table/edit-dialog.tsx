import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale/search-table';
import Download from '@/components/Download';
import FileUpload from '@/components/FileUpload';
import Dialog from '@/components/Dialog';
function EditDialog(props) {
  const t = useLocale(locale);
  const close = () => {
    props.visibled(false);
  };
  return (
    <Modal
      title={t['editDialog.title']}
      visible={props.visible}
      onOk={() => close()}
      onCancel={() => close()}
      autoFocus={false}
      focusLock={true}
    >
      <Download url="http://192.168.0.1" size="large" status="danger" />
      <FileUpload />
      
    </Modal>
    // <Dialog />
  );
}
export default EditDialog;
