import useSystemStore from '@/store/index'
import { SystemStore } from '@/types/common'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row } from 'antd'
import './index.scss'
export default function PersonalCenter() {
  // const { systemSetting, setSystemSetting, userInfo } = useSystemStore() as SystemStore
  const { userInfo } = useSystemStore() as SystemStore
  return (
    <div className="PersonalCenter">
      <div>
        <Avatar src={userInfo?.avatar} size={120} style={ {objectPosition: 'top'} } icon={<UserOutlined />} />
      </div>
      <div className="Info">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div>部门：开发一部</div>
          </Col>
          <Col span={12}>
            <div>岗位：开发岗</div>
          </Col>
          <Col span={12}>
            <div>性别：女</div>
          </Col>
          <Col span={12}>
            <div>邮箱：sutter.wu@outlook.com</div>
          </Col>
          <Col span={12}>
            <div>联系电话：15117987823</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
