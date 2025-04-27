
import { Button } from "antd"
import {PoweroffOutlined} from '@ant-design/icons' 
export default function RoomsType() {
  return (
    <div>
      RoomsType
      <Button data-md-name="测试按钮" icon={<PoweroffOutlined />} type="primary">
        新增
      </Button>
      <Button data-md-name="测试按钮" type="primary">
        新增2
      </Button>
      <Button data-md-name="测试按钮" type="primary">
        新增3
      </Button>
    </div>
  )
}
