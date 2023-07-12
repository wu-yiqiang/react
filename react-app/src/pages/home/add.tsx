// import React, { useEffect, useMemo, useCallback } from 'react'
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from 'react'
import { Popup } from 'antd-mobile'
import Button from '@material-ui/core/Button'
import SvgIcon from '@/components/SvgIcon'
import Color from './color'
import Ring from './ring'
import style from './add.module.less'

function Add(props: any) {
  const { open, closeMask } = props
  const [days] = useState([7, 15, 30, 60, 100, 120, 130, 150, 180])
  const [colors] = useState(['#748bf0', '#445bc7', '#e3b270', '#67f2d1', '#BBDEFB', '#03A9F4', '#78f9f6', '#B2DFDB', '#9169f9', '#ddaa23', '#F79F1F', '#FDA7DF', '#6A2C70', '#f08a5d', '#08d9d6', '#aa96da', '#61c0bf', '#00b8a9'])
  const [selected, setSelected] = useState(0)
  const [currentColor, setCurrentColor] = useState('#748bf0')
  const [ringOpen, setRingOpen] = useState(false)
  const [ringName, setRingName] = useState('AlarmClock')
  const handleColors = (event: any) => {
    const color = event?.target?.getAttribute('data-color')
    if (!color) return
    setCurrentColor(color)
    const index = colors.findIndex((v) => v === color)
    setSelected(index)
  }
  const handleSave = () => {
    closeMask()
  }
  const handleRing = () => {
    setRingOpen(true)
  }
  const closeRingMask = () => {
    setRingOpen(false)
  }
  return (
    <Popup
      visible={open}
      onMaskClick={() => {
        closeMask()
      }}
      bodyStyle={{ maxHeight: '90vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', overflow: 'scroll' }}
    >
      <div className={style.Add}>
        <div className={style.top}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              closeMask()
            }}
          >
            取消
          </Button>
          <span className={style.Title}>asd</span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave()
            }}
          >
            保存
          </Button>
        </div>
        <div className={style.content}>
          <div className={style.days}>
            <p className={style.title}>坚持天数</p>
            <div className={style.select}>
              {days.map((v: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                return (
                  <Button key={index} variant="outlined">
                    {v}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className={style.colors}>
            <p className={style.title}>选择颜色</p>
            <div className={style.select} onClick={(e) => handleColors(e)}>
              {colors.map((v: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                return <Color className={style.colorsBox} selected={selected === index ? true : false} key={index} color={v} value={v} />
              })}
            </div>
          </div>
          <div className={style.colors}>
            <p className={style.title}>提送铃声</p>
            <div className={style.select} onClick={(e) => handleColors(e)}>
              <div className={style.Rings} onClick={handleRing}>
                <div className={style.selectRing}>
                  <SvgIcon name="ring" size="40px" />
                  <span>{ringName}</span>
                </div>
              </div>
              <Ring open={ringOpen} ring={ringName} closeRingMask={closeRingMask} />
            </div>
          </div>
          <div className={style.colors}>
            <p className={style.title}>推送时间</p>
            <div className={style.select} onClick={(e) => handleColors(e)}>
              {colors.map((v: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                return <Color className={style.colorsBox} selected={selected === index ? true : false} key={index} color={v} value={v} />
              })}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Add
