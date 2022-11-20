/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from 'react';
import { Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';

class Dialog extends Component {
  constructor(props) {
    super(props);
    const t = useLocale(locale);
    this.state = {
      visible: this.props.show,
      title: t['editDialog.title'],
    };
  }
  closed() {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <Modal
        title={this.state.title}
        visible={this.state.visible}
        onOk={() => {
          closed;
        }}
        onCancel={() => {
          closed;
        }}
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
