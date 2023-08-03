// import React, { useEffect, useMemo, useCallback } from 'react'
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from 'react'
import { Popup } from 'antd-mobile'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SvgIcon from '@/components/SvgIcon'
import ScrollNumber from '@/components/ScrollNumber'
import Color from './color'
import Ring from './ring'
import style from './add.module.less'


function Add(props: any) {
  const { open, closeMask } = props
  const [day, setDay] = useState(3)
  const [colors] = useState(['#748bf0', '#445bc7', '#e3b270', '#67f2d1', '#BBDEFB', '#03A9F4', '#78f9f6', '#B2DFDB', '#9169f9', '#ddaa23', '#F79F1F', '#FDA7DF', '#6A2C70', '#f08a5d', '#08d9d6', '#aa96da', '#61c0bf', '#00b8a9'])
  const [selected, setSelected] = useState(0)
  const [currentColor, setCurrentColor] = useState('#748bf0')
  const [ringOpen, setRingOpen] = useState(false)
  const [ringName, setRingName] = useState('AlarmClock')
  const [currentDay, setCurrentDay] = useState(3)
  const selectDay = (event: any) => {
    const day = event?.target.innerHTML
    if (!day || isNaN(+day)) return
    console.log('day', day)
    setCurrentDay(+day)
  }
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
  function changeRimgName(ring: string) {
    setRingName(ring)
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
            onClick={() => {
              closeMask()
            }}
            style={{ backgroundColor: currentColor, color: '#fff' }}
          >
            取消
          </Button>
          <span className={style.Title}>asd</span>
          <Button
            variant="contained"
            style={{ backgroundColor: currentColor, color: '#fff' }}
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
              <div className={style.Days}>
                <ScrollNumber
                  value={day}
                  numberStyle={{
                    background: currentColor
                  }}
                />
              </div>
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
                <div className={style.selectRing} style={{ backgroundColor: currentColor }}>
                  <SvgIcon name="ring" size="35px" color="#fff" />
                  <span>{ringName}</span>
                </div>
              </div>
              <Ring open={ringOpen} ringName={ringName} closeRingMask={closeRingMask} changeRimgName={changeRimgName} currentColor={currentColor} />
            </div>
          </div>
          <div className={style.colors}>
            <p className={style.title}>推送时间</p>
            <div className={style.select}>
              <div className={style.Days}>
                <ScrollNumber
                  value={day}
                  numberStyle={{
                    background: currentColor
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Add
