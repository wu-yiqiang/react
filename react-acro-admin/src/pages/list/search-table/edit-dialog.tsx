import React, { useState } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';


class Dialog extends React.Component {
  constructor(props) {
    super(props);
    const [visible, setVisible] = useState(props.show);
    const t = useLocale(locale);
  }

  render() {
    return (
      <Modal
      title={t['editDialog.title']}
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
}
export default Dialog;