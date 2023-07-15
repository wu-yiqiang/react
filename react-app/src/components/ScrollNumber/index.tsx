import React, { useEffect, useMemo, useCallback, useState } from 'react'
import style from './index.module.less'
let columns: Array<Array<Object>> = []
function ScrollNumber(props: any) {
  const { value, numberStyle, maxValue = 100 } = props
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
  return (
    <div className={style.ScrollNumber}>
      {columns.map((value, index) => {
        return (
          <span key={index} style={numberStyle} className={style.scroll}>
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

export default ScrollNumber
