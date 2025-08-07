import { message } from 'antd'
import { JointContent, NoticeType } from "antd/es/message/interface";
let messages: JointContent[] = []
interface ToastInterface {
  info: (value: JointContent) => void;
  error: (value: JointContent) => void;
  success: (value: JointContent) => void;
}
const messageShow = (
  messageType: NoticeType,
  value: JointContent,
  duration: number
) => {
  if (messages.includes(value)) return;
  messages.push(value);
  message[messageType](value, duration, () => {
    messages = messages.filter((item) => item !== value);
  });
};
const Toast: ToastInterface = {
  info: (value: JointContent, duration = 2) => {
    messageShow('info',value, duration)
  },
  error: (value: JointContent, duration = 2) => {
    messageShow("error", value, duration);
  },
  success: (value: JointContent, duration = 2) => {
    messageShow("success", value, duration);
  }
}

export default Toast;