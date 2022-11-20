import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';

function EditDialog(props) {
  const [dialogShow, setDialogShow] = useState(false);
  const t = useLocale(locale);
  console.log(dialogShow);

  return (
    <Modal
      title={t['editDialog.title']}
      visible={dialogShow}
      onOk={() => setDialogShow(false)}
      onCancel={() => setDialogShow(false)}
      autoFocus={false}
      focusLock={true}
    >
      <p>
        {dialogShow}sdfs11 You can customize modal body text by the current
        situation. This modal will be closed immediately once you press the OK
        button.
      </p>
    </Modal>
  );
}
export default EditDialog;
