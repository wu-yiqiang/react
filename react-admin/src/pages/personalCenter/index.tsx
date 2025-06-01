import useSystemStore from '@/store/index'
import { SystemStore } from '@/types/common'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row } from 'antd'
import UpdateAvatarDialog from './update-avatar-dialog'
import SelfService from './self-service'
import PersonalDetails from './personnal-detail'
import avatar from '@/assets/images/user.jpg'
import './index.scss'
import { useState } from 'react'
import AvatarHover from '@/components/Avatar'
export default function PersonalCenter() {
  // const { systemSetting, setSystemSetting, userInfo } = useSystemStore() as SystemStore
  const { userInfo } = useSystemStore() as SystemStore
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('详细信息')
  const [tabs, setTabs] = useState([{title: '详细信息'}, {title: '自助服务'}])
  const handleOk = () => {
    handleOpenStatus(true)
  }
  const handleOpenStatus = (value: boolean) => {
    setVisible(value)
  }
  const handleLoadError = (e: any) => {
    e.target.src = avatar
  }
  const handleActive = (value: string) => {
    setActive(value)
  }
  return (
    <div className="PersonalCenter">
      <div className="topbar">
        {/* <AvatarHover image={userInfo?.avatar} /> */}
        <div className="image">
          <img src={userInfo?.avatar ?? ''} onError={handleLoadError} />
          <div className="tips" onClick={() => handleOpenStatus(true)}>
            修改
          </div>
        </div>
        <div className="Info">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>姓名：张三</div>
            </Col>
            <Col span={12}>
              <div>工号：6786549</div>
            </Col>
            <Col span={12}>
              <div>部门：开发一部</div>
            </Col>
            <Col span={12}>
              <div>岗位：研发工程师</div>
            </Col>
            <Col span={12}>
              <div>邮箱：zhang_san@outlook.com</div>
            </Col>
            <Col span={12}>
              <div>电话：15117987823</div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="left-pannel">
        {tabs?.map((tab) => {
          return (
            <div className={active == tab?.title ? 'pannel-item active-pannel-item' : 'pannel-item'} onClick={() => handleActive(tab?.title)}>
              {tab?.title}
            </div>
          )
        })}
      </div>
      {active == '详细信息' ? <PersonalDetails /> : null}
      {active == '自助服务' ? <SelfService /> : null}
      <UpdateAvatarDialog open={visible} handleClose={() => handleOpenStatus(false)} handleOk={handleOk} image={userInfo?.avatar} />
    </div>
  )
}
