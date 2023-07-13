import { useEffect, useState } from 'react'
import style from './item.module.less'
import Loading from '@/components/Loading'
function Item(props: any) {
  const { src, introduce, sportId } = props
  const [loading, setLoading] = useState(true)
  const loadingDone = () => {
    setLoading(false)
  }
  return (
    <div className={style.Item}>
      <Loading loading={loading}>
        <img src={src} alt="" onLoad={loadingDone} data-id={ sportId } />
        <div className={style.introduce}>{introduce}</div>
      </Loading>
    </div>
  )
}

export default Item
