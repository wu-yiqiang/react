import React, { useEffect, useMemo, useCallback, useState } from 'react'
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
    console.log('columns', columns)
  }, [maxValue])
  function handleScroll() {
    console.log('scroll')
  }
  return (
    <div className={style.NumberPicker}>
      {columns.map((value, index) => {
        return (
          <span key={index} style={numberStyle} className={style.scroll}>
            {value.map((v, i) => {
              return (
                <label key={i} className={style.numLabel} onScroll={handleScroll}>
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
