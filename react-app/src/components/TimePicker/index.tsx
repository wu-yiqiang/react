import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { handleScroll } from '@/utils/utils'
import style from './index.module.less'
let columns: Array<Array<Object>> = []
function TimePicker(props: any) {
  const { value = "08:00", styleColor } = props
  const [h,setH] = useState(0)
  const [h2, setH2] = useState(0)
  const [m, setM] = useState(0)
  const [m2, setM2] = useState(0)
  const [hour] = useState([0, 1, 2])
  const [hour2, setHour2] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [minute] = useState([0, 1, 2, 3, 4, 5, 6])
  const [minute2, setMinute2] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  useEffect(() => {
  }, [])
  const hourChange = (event: any) => {
    const value = handleScroll(event)
    const target = event.target.scrollTop
    const height = event.target.offsetHeight
    if (target === 2 * height) {
      setHour2([0, 1, 2, 3, 4])
    } else {
      setHour2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
    return value
  }
  const minuteChange = (event: any) => {
    const value = handleScroll(event)
    const target = event.target.scrollTop
    const height = event.target.offsetHeight
    if (target === 6 * height) {
      setMinute2([0])
    } else {
      setMinute2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
    return value
  }
  const scrollEle = (event: any, type: string) => {
    if (type === 'Hour') setH(hourChange(event))
    if (type === 'Hour2') setH2(handleScroll(event))
    if (type === 'Minute') setM(minuteChange(event))
    if (type === 'Minute2')setM2(handleScroll(event))
    const asd = `${h}${h2}:${m}${m2}`
    console.log('scroll', asd)
  }
  return (
    <div className={style.TimePicker}>
      <div className={style.time} style={styleColor} onScroll={(e) => scrollEle(e, 'Hour')}>
        {hour.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.time} style={styleColor} onScroll={(e) => scrollEle(e, 'Hour2')}>
        {hour2.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.splitBox}>:</div>
      <div className={style.time} style={styleColor} onScroll={(e) => scrollEle(e, 'Minute')}>
        {minute.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.time} style={styleColor} onScroll={(e) => scrollEle(e, 'Minute2')}>
        {minute2.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel}>
              {v}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default TimePicker
