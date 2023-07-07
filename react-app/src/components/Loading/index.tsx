import CircularProgress from '@material-ui/core/CircularProgress'
import style from './index.module.less'
import { ReactNode, useEffect, useState } from 'react'
interface Props {
  loading: boolean
  children?: ReactNode
}
function Loading(props: Props) {
  const { loading } = props
  const loadingStyle = { display: loading ? 'block' : 'none'}
  const childrenStyle = { display: loading ? 'none' : 'block' }
  return (
    <div className={style.Loading}>
      <CircularProgress style={loadingStyle} />
      <div style={childrenStyle}>
        {props.children}
        {/* <div className={style.slotBox}>{props.children}</div> */}
      </div>
      {/* <CircularProgress style={loadingStyle} /> */}
      {/* <div style={childrenStyle}>
        {props.children}
      </div> */}
    </div>
  )
}

export default Loading
