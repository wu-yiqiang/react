import React, { useEffect, useMemo, useCallback, useState } from 'react'
import {handleScroll} from '@/utils/utils'
import style from './index.module.less'
let columns: Array<Array<Object>> = []
function NumberPicker(props: any) {
  const { value, numberStyle, maxValue = 999 } = props
  const [bite] = useState(maxValue.toString().length)
  useEffect(() => {
    columns = []
    const maxValueStr = maxValue + ''
    for (let index = 0; index < bite; index++) {
      columns.push([])
      for (let j = 0; j <= +maxValueStr[index]; j++) {
        columns[index].push(j)
      }
    }
  }, [maxValue])
  const scrollEle = (event:any) => {
    const value = handleScroll(event)
    console.log('value', value)
  }
  return (
    <div className={style.NumberPicker}>
      {columns.map((value, index) => {
        return (
          <span key={index} style={numberStyle} className={style.scroll} onScroll={(e) => scrollEle(e)}>
            {value.map((v, i) => {
              return (
                <label key={i} className={style.numLabel}>
                  {v}
                </label>
              )
            })}
          </span>
        )
      })}
    </div>
  )
}

export default NumberPicker
