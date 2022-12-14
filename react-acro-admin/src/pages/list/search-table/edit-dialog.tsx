import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import Download from '@/components/Download'
import FileUpload from '@/components/FileUpload'
function EditDialog(props) {
  const t = useLocale(locale)
  const close = () =>  {
    props.visibled(false)
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
      <Download />
      <FileUpload />
    </Modal>
  );
}
export default EditDialog;
