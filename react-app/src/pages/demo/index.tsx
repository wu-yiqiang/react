import React, { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useCreation } from '@/components'
function Demo(props: any) {
  const [_, setFlag] = useState<boolean>(false)

  const getNowData = () => {
    return Math.random()
  }

  const nowData = useCreation(() => getNowData(), [])

  return (
    <div style={{ padding: 50 }}>
      <div>正常的函数：{getNowData()}</div>
      <div>useCreation包裹后的：{nowData}</div>
      <button
        onClick={() => {
          setFlag((v) => !v)
        }}
      >
        {' '}
        渲染
      </button>
    </div>
  )
}

export default withRouter(Demo)
