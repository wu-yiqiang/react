import React, { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import Item from './item'
import style from './index.module.less'
import SvgIcon from '@/components/SvgIcon'
import Loading from '@/components/Loading'
import Indicator from '@/components/Indicator'
import { Swiper } from 'antd-mobile'
import { db } from '@/db/db'
function Home(props: any) {
  const [lists, setLists] = useState([{ time: '', title: '', remainder: 0, total: 0, color: '' }])
  const [banners, setBanner] = useState([{ src: '0', introduce: 'sss' }])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    ;(async () => {
      const bannerLists = await db.banners.toArray()
      setBanner(bannerLists)
      const lis = await db.targets.toArray()
      setLists(lis)
      console.log('list', lists)
    })()
  }, [])
  const loadingDone = () => {
    setLoading(false)
  }
  const items = banners.map((bannerItem, index) => (
    <Swiper.Item key={index}>
      <div>
        <img src={bannerItem.src} alt="" onLoad={loadingDone} />
      </div>
    </Swiper.Item>
  ))
  
  return (
    <div className={style.Home}>
      {/* 图片 */}
      <div className={style.banner}>
        <Loading loading={loading}>
          <Swiper
            loop
            autoplay
            onIndexChange={(i) => {
              setCurrent(i)
              console.log(i, 'onIndexChange1')
            }}
          >
            {items}
          </Swiper>
        </Loading>
      </div>
      {/* 滑动指示器 */}
      { loading ? '' : <div className={style.indicator}>
        <Indicator current={current} lists={banners} />
      </div>}
      {/* 列表 */}
      <div className={style.filter}>
        <Button size="small" variant="contained" color="primary" endIcon={<SvgIcon name="filter" color={'#fff'} size="20px" />}>
          全部
        </Button>
      </div>
      <div className={style.list}>
        {/* 排序 */}
        {/* 列表页面 */}
        {/* { Item } */}
        {lists.map((v, index) => {
          return <Item key={index} time={dayjs(v.time).format('YYYY-MM-DD HH:mm')} remainder={v.remainder} title={v.title} total={v.total} color={v.color} />
        })}
      </div>
      {/* 新增 */}
      <IconButton className={style.add}>
        <AddCircle style={{ fontSize: 50, color: '#3f51b5' }} />
      </IconButton>
    </div>
  )
}

export default withRouter(Home)
