import { Input } from 'antd'
import useSystemStore from '@/store/index'
import Dialog from '@/components/Dialog'
import { SystemStore } from '@/types/common'
import avatar from '@/assets/images/user.jpg'
import './index.scss'
import dayjs from 'dayjs'
// import eventMitt from '@/utils/eventMitt'
import { ChangeEvent, ReactEventHandler, useMemo, useState } from 'react'
import { TimeInterval } from '@/utils'
import { throttle } from 'lodash-es'
export default function ScreenLock() {
  const { systemSetting, setSystemSetting, userInfo } = useSystemStore() as SystemStore
  const [currentDayTime, setCurrentDayTime] = useState(dayjs().format('DD/MM/YYYY HH:mm'))
  const handleUnlock = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (value === systemSetting.lockPassword) {
      setSystemSetting({ ...systemSetting, locked: false })
    }
  }
  const handleLoadError = (e: any) => {
    e.target.src = avatar
  }
  new TimeInterval(() => {
    setCurrentDayTime(dayjs().format('DD/MM/YYYY HH:mm'))
  }, 1000)
  return (
    <Dialog open={true}>
      <div className="mainBox">
        <div className="dateTime">
          <div className="date">{currentDayTime?.split(' ')[0]}</div>
          <div className="time">{currentDayTime?.split(' ')[1]}</div>
        </div>
        <div className="user">
          <div className="avatar">
            <img src={userInfo?.avatar ?? ''} onError={handleLoadError} />
          </div>
          <div className="name">{userInfo?.username}</div>
          <Input.Password
            placeholder="密码"
            onKeyDown={(e) => {
              e?.stopPropagation()
            }}
            onChange={(e) => handleUnlock(e)}
          />
        </div>
      </div>
    </Dialog>
  )
}
