import React, { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import IconButton from '@material-ui/core/IconButton'
import NativeSelect from '@material-ui/core/NativeSelect'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import AddCircle from '@material-ui/icons/AddCircle'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Item from './item'
import style from './index.module.less'
import SvgIcon from '@/components/SvgIcon'
import Loading from '@/components/Loading'
import Indicator from '@/components/Indicator'
import Add from './add'
import { Swiper } from 'antd-mobile'
import { db } from '@/db/db'
function Home(props: any) {
  const [lists, setLists] = useState([{ time: '', title: '', remainder: 0, total: 0, color: '', state: '', id: 0,fn: null }])
  const [banners, setBanner] = useState([{ src: '0', introduce: 'sss' }])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [filterList, setFilterList] = useState(['全部', '进行中', '已完成', '未完成'])
  const [state, setState] = useState('全部')
  const [open, setOpen] = useState(false)
  const [showAddIcon, setShowAddIcon] = useState(true)
  useEffect(() => {
    ;(async () => {
      const bannerLists = await db.banners.toArray()
      setBanner(bannerLists)
      getList()
    })()
  }, [])
  const getList = async () => {
    const lis = await db.targets.toArray()
    lis.sort((a: any, b: any) => b.time - a.time)
    setLists(lis)
  }
  const closeMask = () => {
    setShowAddIcon(true)
    setOpen(false)
  }
  const openMask = () => {
    setShowAddIcon(false)
    setOpen(true)
  }
  const loadingDone = () => {
    setLoading(false)
  }
  
  const handleChange = async (event: any) => {
    const status = event?.target?.value ?? '全部'
    setState(status)
    let filterLists = []
    if (status === '全部') {
      filterLists = await db.targets.toArray()
    } else {
      filterLists = await db.targets.where({ state: status }).toArray()
    }
    filterLists.sort((a: any, b: any) => b.time - a.time)
    setLists(filterLists)
  }
  const items = banners.map((bannerItem, index) => (
    <Swiper.Item key={index}>
      <div>
        <img src={bannerItem.src} alt="" onLoad={loadingDone} />
      </div>
    </Swiper.Item>
  ))
  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      color: '#fff',
      backgroundColor: '#3f51b5',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        color: '#fff',
        backgroundColor: '#3f51b5',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    }
  }))(InputBase)
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
            }}
          >
            {items}
          </Swiper>
        </Loading>
      </div>
      {/* 滑动指示器 */}
      {loading ? (
        ''
      ) : (
        <div className={style.indicator}>
          <Indicator current={current} lists={banners} />
        </div>
      )}
      {/* 列表 */}
      <div className={style.filter}>
        {/* <Button size="medium" variant="contained" color="primary" endIcon={<SvgIcon name="filter" color={'#fff'} size="20px" />} onClick={handleOpenPop}>
          {state}
        </Button> */}
        <NativeSelect value={state} onChange={(e) => handleChange(e)} input={<BootstrapInput />}>
          {filterList.map((v, index) => {
            return (
              <option key={index} value={v}>
                {v}
              </option>
            )
          })}
        </NativeSelect>
      </div>
      <div className={style.list}>
        {/* 排序 */}
        {/* 列表页面 */}
        {/* { Item } */}
        {lists.map((v, index) => {
          return <Item key={index} time={dayjs(v.time).format('YYYY-MM-DD HH:mm')} remainder={v.remainder} title={v.title} total={v.total} color={v.color} state={v?.state} index={v.id} fn={getList} />
        })}
      </div>
      {/* 新增 */}
      {showAddIcon ? (
        <Fab color="primary" className={style.add} onClick={openMask}>
          <AddIcon />
        </Fab>
      ) : null}
      <Add open={open} closeMask={closeMask} />
    </div>
  )
}

export default withRouter(Home)
