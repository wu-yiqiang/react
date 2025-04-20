
import { Button, Input } from 'antd'
import useSystemStore from '@/store/index'
import Dialog from '@/components/Dialog'
import { SystemStore } from '@/types/common'
import avatar from '@/assets/images/avatar.jpg'
import './index.scss'
import dayjs from 'dayjs'
import eventMitt from '@/utils/eventMitt'
export default function ScreenLock() {
  const { systemSetting, setSystemSetting } = useSystemStore() as SystemStore
  const handleUnlock = (e: Event) => {
    const value = e?.target?.value
    if (value === systemSetting.lockPassword) {
      setSystemSetting({ ...systemSetting, locked: false })
      eventMitt.emit('SYSTEM:LOCKSCREEN')
    }
  }
  return (
    <Dialog
      open={true}
      className={systemSetting.locked ? 'close' : null}
      slot={
        <div className="mainBox">
          <div className="dateTime">
            <div className="date">{dayjs().format('DD/MM YYYY')}</div>
            <div className="time">{dayjs().format('hh:mm')}</div>
          </div>
          <div className="user">
            <div className="avator">
              <img src={avatar} />
            </div>
            <div className="name">Sutter</div>
            <Input.Password placeholder="密码" onChange={handleUnlock} />
          </div>
        </div>
      }
    ></Dialog>
  )
}


