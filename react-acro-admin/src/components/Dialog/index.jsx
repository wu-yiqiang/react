import { useState } from 'react';
import useLocale from '@/utils/useLocale';
import { Button, Modal } from '@arco-design/web-react';
import locale from '@/locale';
import React from 'react';
function Dialog() {
  const [visible, setVisible] = React.useState(false);
  return (
    <Modal
      title="Modal Title"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
    >
      <p>
        You can customize modal body text by the current situation. This modal
        will be closed immediately once you press the OK button.
      </p>
    </Modal>
  );
}

export default Dialog;
