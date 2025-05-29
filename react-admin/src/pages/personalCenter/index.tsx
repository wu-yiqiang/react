import useSystemStore from '@/store/index'
import { SystemStore } from '@/types/common'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row } from 'antd'
import UpdateAvatarDialog from './update-avatar-dialog'
import avatar from '@/assets/images/user.jpg'
import './index.scss'
import { useState } from 'react'
export default function PersonalCenter() {
  // const { systemSetting, setSystemSetting, userInfo } = useSystemStore() as SystemStore
  const { userInfo } = useSystemStore() as SystemStore
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('个人中心')
  const [tabs, setTabs] = useState([{title: '个人中心'}, {title: '和我相关'}])
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
        <img src={userInfo?.avatar ?? ''} onError={handleLoadError} onClick={() => handleOpenStatus(true)} />
        <div className="Info">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>姓名：Sutter</div>
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
              <div>性别：女</div>
            </Col>
            <Col span={12}>
              <div>生日：1997-05-05</div>
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
      <div className="left-pannel">{tabs?.map((tab) => {
        return (
          <div className={active == tab?.title ? 'pannel-item active-pannel-item' : 'pannel-item'} onClick={() => handleActive(tab?.title)}>
            {tab?.title}
          </div>
        )
      })}</div>
      <div className="right-contents">ss</div>
      <UpdateAvatarDialog open={visible} handleClose={() => handleOpenStatus(false)} handleOk={handleOk} image={userInfo?.avatar} />
    </div>
  )
}
