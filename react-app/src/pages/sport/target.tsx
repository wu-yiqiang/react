import { useEffect, useState } from 'react'
import { Popup } from 'antd-mobile'
import style from './target.module.less'
import Loading from '@/components/Loading'
import { db } from '@/db/db'
function Target(props: any) {
  const { state, closeMask, sportId } = props
  const [item, setItem] = useState({ src: '', introduce: '' })
  const [loading, setLoading] = useState(true)
  const loadingDone = () => {
    setLoading(false)
  }
  useEffect(() => {
    ;(async () => {
      const target = await db.sports.where({ sportId: sportId }).first()
      setItem(target)
    })()
  }, [state])
  return (
    <Popup
      visible={state}
      onMaskClick={() => {
        closeMask()
        setLoading(true)
      }}
      bodyStyle={{ maxHeight: '90vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
    >
      <div className={style.content}>
        <Loading loading={loading}>
          <div className={style.banner}>
            <img src={item.src} alt="" onLoad={loadingDone} />
          </div>
          <div className={style.detail}>{item.introduce}</div>
        </Loading>
      </div>
    </Popup>
  )
}

export default Target
