import { useState, useReducer, useEffect } from 'react'
import style from './index.module.less'
import SvgIcon from '@/components/SvgIcon'
import Item from './item'
import Target from './target'
import { db } from '@/db/db'
function Sport() {
  const [state, setState] = useState(false)
  const [lists, setLists] = useState<Array<SportList>>([{ sportId: 0, src: '', introduce: '' }])
  const [sportId, setSportId] = useState(1)
  useEffect(() => {
    ;(async () => {
      const items = await db.sports.toArray()
      setLists(items)
    })()
  }, [])
  const handleDetail = (event: any) => {
    const src = event.target.src
    const target = lists.find((v) => {
      return v.src === src
    })
    if (target?.sportId) {
      setSportId(target.sportId)
      setState(true)
    }
  }
  const closeMask = () => {
    setState(false)
  }
  return (
    <div className={style.Sport}>
      <div className={style.topBox}>
        <div className={style.title}>运动</div>
        <SvgIcon name="operate" color={'#606060'} size="40px" />
      </div>
      <div className={style.whiteBox}></div>
      <div
        className={style.content}
        onClick={(e) => {
          handleDetail(e)
        }}
      >
        {lists.map((v, index) => {
          return <Item key={index} src={v.src} introduce={v.introduce} />
        })}
      </div>
      <Target state={state} closeMask={closeMask} sportId={sportId} />
    </div>
  )
}

export default Sport
