import { useEffect, useState } from 'react'
import { Popup } from 'antd-mobile'
import style from './target.module.less'
import { db } from '@/db/db'
function Target(props: any) {
  const { state, closeMask, sportId } = props
  const [item, setItem] = useState({ src: '', introduce: '' })
  console.log('kkkk')
  useEffect(() => {
    ;(async () => {
      const target = await db.sports.get(sportId)
      //setItem(target)
    })()
  }, [state])
  return (
    <Popup
      visible={state}
      onMaskClick={() => {
        closeMask()
      }}
      bodyStyle={{ maxHeight: '90vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', minHeight: '20vh' }}
    >
      <div className={style.content}>
        <div className={style.banner}>
          <img src={item.src} alt="" />
        </div>
        <div className={style.detail}>{item.introduce}</div>
      </div>
    </Popup>
  )
}

export default Target
