import './index.scss'
import { Avatar, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

export default function PersonalDetails() {
  const { t } = useTranslation()
  return (
    <div className="PersonalDetails">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <span className="title">{t('gender')}：</span>
          <span>女</span>
        </Col>
        <Col span={12}>
          <span className="title">{t('degree')}：</span>
          <span>本科</span>
        </Col>
        <Col span={12}>
          <span className="title">{t('idType')}：</span>
          <span>身份证</span>
        </Col>
        <Col span={12}>
          <span className="title">{t('idNumber')}：</span>
          <span>7877232122</span>
        </Col>
        <Col span={12}>
          <span className="title">{t('emergencyCalls')}：</span>
          <span>13117966595</span>
        </Col>
        {/* <Col span={12}>
          <span className="title">家庭住址：</span>
          <span>广东省深圳市向心路55号</span>
        </Col> */}
      </Row>
    </div>
  )
}
