
import { Input } from 'antd'
import useSystemStore from '@/store/index'
import Dialog from '@/components/Dialog'
import { SystemStore } from '@/types/common'
import avatar from '@/assets/images/user.jpg'
import './index.scss'
import dayjs from 'dayjs'
import eventMitt from '@/utils/eventMitt'
import { useState } from 'react'
export default function ScreenLock() {
  const { systemSetting, setSystemSetting, userInfo } = useSystemStore() as SystemStore
  const [currentDayTime, setCurrentDayTime] = useState(
    dayjs().format("DD/MM/YYYY HH:mm")
  );
  const handleUnlock = (e: Event) => {
    const value = e?.target?.value
    if (value === systemSetting.lockPassword) {
      setSystemSetting({ ...systemSetting, locked: false })
      eventMitt.emit('SYSTEM:LOCKSCREEN')
    }
  }
  setInterval(() => {
    setCurrentDayTime(dayjs().format("DD/MM/YYYY HH:mm"));
  }, 1000)
  return (
    <Dialog
      open={true}
      // className={systemSetting.locked ? 'close' : null}
      slot={
        <div className="mainBox">
          <div className="dateTime">
            <div className="date">{currentDayTime?.split(" ")[0]}</div>
            <div className="time">{currentDayTime?.split(" ")[1]}</div>
          </div>
          <div className="user">
            <div className="avator">
              <img src={avatar} />
            </div>
            <div className="name">{userInfo?.username}</div>
            <Input.Password placeholder="密码" onChange={handleUnlock} />
          </div>
        </div>
      }
    ></Dialog>
  );
}


