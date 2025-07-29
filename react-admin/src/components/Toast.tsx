import { message } from 'antd'
import { JointContent } from 'antd/es/message/interface'
let messages: JointContent[] = []
interface ToastInterface {
  info: (value: JointContent) => void;
  error: (value: JointContent) => void;
  success: (value: JointContent) => void;
}
const Toast: ToastInterface = {
  info: (value: JointContent, duration = 2) => {
    if (messages.includes(value)) return
    messages.push(value)
    message.info(value, duration, () => {
      messages = messages.filter((item) => item !== value)
    })
  },
  error: (value: JointContent, duration = 2) => {
    if (messages.includes(value)) return
    messages.push(value)
    message.error(value, duration, () => {
      messages = messages.filter((item) => item !== value)
    })
  },
  success: (value: JointContent, duration = 2) => {
    if (messages.includes(value)) return
    messages.push(value)
    message.success(value, duration, () => {
      messages = messages.filter((item) => item !== value)
    })
  }
}

export default Toast;