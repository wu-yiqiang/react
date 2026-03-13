import useSystemStore from '@/store/index'
import { SystemStore } from '@/types/common'
import { Avatar, Col, Row } from 'antd'
import UpdateAvatarDialog from './update-avatar-dialog'
import SelfService from './self-service'
import PersonalDetails from './personnal-detail'
import avatar from '@/assets/images/user.jpg'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import './index.scss'
export default function PersonalCenter() {
  const { userInfo } = useSystemStore() as SystemStore
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const [active, setActive] = useState(t('profile'))
  const [tabs, setTabs] = useState([
    { title: t('profile') },
    { title: t('infoUpdate') }
  ])
  const userInfos = useMemo<any>(() => userInfo, [userInfo])
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
  console.log('userInfos', userInfos)
  return (
    <div className="PersonalCenter">
      <div className="topbar">
        {/* <AvatarHover image={userInfo?.avatar} /> */}
        <div className="image">
          <img src={userInfo?.avatar ?? ''} onError={handleLoadError} />
          <div className="tips" onClick={() => handleOpenStatus(true)}>
            {t('revise')}
          </div>
        </div>
        <div className="Info">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>{t('name')}：{userInfos?.name}</div>
            </Col>
            <Col span={12}>
              <div>{t('jobNumber')}：6786549</div>
            </Col>
            <Col span={12}>
              <div>{t('department')}：开发部</div>
            </Col>
            <Col span={12}>
              <div>{t('job')}：开发工程师</div>
            </Col>
            <Col span={12}>
              <div>{t('email')}：{userInfos?.email}</div>
            </Col>
            <Col span={12}>
              <div>{t('phone')}: {userInfos?.mobile}</div>
            </Col>
          </Row>
        </div>
      </div>
      {/* <div className="left-pannel">
        {tabs?.map((tab, index) => {
          return (
            <div className={active == tab?.title ? 'pannel-item active-pannel-item' : 'pannel-item'} onClick={() => handleActive(tab?.title)} key={index}>
              {tab?.title}
            </div>
          )
        })}
      </div> */}
      {/* {active == t('profile') ? <PersonalDetails /> : null} */}
      {active == t('infoUpdate') ? <SelfService /> : null}
      {visible ? <UpdateAvatarDialog open={visible} handleClose={() => handleOpenStatus(false)} handleOk={handleOk} image={userInfo?.avatar} /> : null}
    </div>
  )
}
