import { message } from 'antd'
import { JointContent } from 'antd/es/message/interface'
interface ToastInterface {
  info: (value: JointContent) => void;
  error: (value: JointContent) => void;
  success: (value: JointContent) => void;
}
const Toast: ToastInterface = {
  info: (value: JointContent) => {
    message.destroy();
    message.info(value);
  },
  error: (value: JointContent) => {
    message.destroy();
    message.error(value);
  },
  success: (value: JointContent) => {
    message.destroy();
    message.success(value);
  },
};

export default Toast;