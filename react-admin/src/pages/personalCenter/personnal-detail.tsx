import './index.scss'
import { Avatar, Col, Row } from 'antd'
export default function PersonalDetails() {
  return (
    <div className="PersonalDetails">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <span className="title">性别：</span>
          <span>女</span>
        </Col>
        <Col span={12}>
          <span className="title">学历：</span>
          <span>本科</span>
        </Col>
        <Col span={12}>
          <span className="title">籍贯：</span>
          <span>广东深圳</span>
        </Col>
        <Col span={12}>
          <span className="title">生日：</span>
          <span>1999-05-05</span>
        </Col>
        <Col span={12}>
          <span className="title">紧急电话：</span>
          <span>13117966595</span>
        </Col>
        <Col span={12}>
          <span className="title">家庭住址：</span>
          <span>广东省深圳市向心路55号</span>
        </Col>
      </Row>
    </div>
  )
}
