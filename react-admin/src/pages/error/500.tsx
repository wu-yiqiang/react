import { Button, Result } from 'antd'
export default function LoadError() {
  return <Result status="error" title="Page Load Failed" subTitle="Please check the network and the service." />
}
