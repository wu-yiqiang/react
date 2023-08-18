import React, { useEffect, useMemo, useCallback, useState } from 'react'
import style from './index.module.less'
let columns: Array<Array<Object>> = []
function TimePicker(props: any) {
  const { value, styleColor } = props
  const [time] = useState([0,1,2,3,4,5,6,7,8,9])
  useEffect(() => {
  }, [])
  function handleScroll() {
    console.log('scroll')
  }
  return (
    <div className={style.TimePicker}>
      <div className={style.time} style={styleColor}>
        {time.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel} onScroll={handleScroll}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.time} style={styleColor}>
        {time.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel} onScroll={handleScroll}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.splitBox}>
        {/* <div className={style.circle}>.</div>
        <div className={style.circle}>.</div> */}
        :
      </div>
      <div className={style.time} style={styleColor}>
        {time.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel} onScroll={handleScroll}>
              {v}
            </label>
          )
        })}
      </div>
      <div className={style.time} style={styleColor}>
        {time.map((v, i) => {
          return (
            <label key={i} className={style.timeLabel} onScroll={handleScroll}>
              {v}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default TimePicker
