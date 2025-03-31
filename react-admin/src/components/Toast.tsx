import { message } from 'antd'
const Toast = {
  info: (value) => {
    message.destroy()
    message.info(value)
  },
  error: (value) => {
    message.destroy()
    message.error(value)
  },
  success: (value) => {
    message.destroy()
    message.success(value)
  }
}

export default Toast;