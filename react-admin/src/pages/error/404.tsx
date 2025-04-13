import eventMitt from '@/utils/eventMitt'
import { Button, Result } from 'antd'
export default function NotFound() {
  const handleBack = () => {
      eventMitt.emit('ROUTER:BACK')
    }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBack}>
          Back Home
        </Button>
      }
    />
  )
}
