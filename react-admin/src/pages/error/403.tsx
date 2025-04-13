import eventMitt from '@/utils/eventMitt'
import { Button, Result } from 'antd'
export default function NotPermission() {
  const handleBack = () => {
    eventMitt.emit('ROUTER:BACK')
  }
  return <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." extra={<Button type="primary" onClick={handleBack}>Back Home</Button>} />
}
