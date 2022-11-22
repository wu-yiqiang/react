import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';

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
      <p>
        sdfs11 You can customize modal body text by the current
        situation. This modal will be closed immediately once you press the OK
        button.
      </p>
    </Modal>
  );
}
export default EditDialog;
