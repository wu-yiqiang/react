// import React, { useEffect, useMemo, useCallback } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import Item from './item'
import style from './index.module.less'
import SvgIcon from '@/components/SvgIcon'
import loadingGif from '@/assets/banner.gif'
function Home(props: any) {
  const list = [
    { total: 10, remainder: 1, title: '戒奶茶', time: '2023-12-30 12:34', color: '#f9f9f9' },
    { total: 12, remainder: 2, title: '戒肥皂剧', time: '2024-10-3 01:34', color: '#000' },
    { total: 3, remainder: 0, title: '戒烟', time: '2019-02-12 08:23', color: 'red' },
    { total: 9, remainder: 5, title: '健身', time: '2024-11-30 11:34', color: 'blue' },
    { total: 25, remainder: 17, title: '瑜伽', time: '2011-12-30 04:34', color: 'pink' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#f6f6f6' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#f4f4f4' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#555' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#787878' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#dd3422' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#7876dd' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#aa23dd' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#565d51' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#3734aa' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#2aad23' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#11aadd' },
    { total: 50, remainder: 7, title: '举哑铃', time: '2010-12-30 09:34', color: '#4335ab' }
  ]
  const ItemLists = list.map((v, index) => {
    return <Item key={index} time={v.time} remainder={v.remainder} title={v.title} total={v.total} color={ v.color } />
  })
  return (
    <div className={style.Home}>
      {/* 图片 */}
      <div className={style.banner}>
        <img src={loadingGif} />
      </div>
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
        {ItemLists}
      </div>
      {/* 新增 */}
      <IconButton className={style.add}>
        <AddCircle style={{ fontSize: 50, color: '#3f51b5' }} />
      </IconButton>
    </div>
  )
}

export default withRouter(Home)
