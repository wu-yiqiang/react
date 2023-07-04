import { useState,useEffect } from 'react'
import { withRouter, Prompt, useHistory } from 'react-router-dom'
import style from './index.module.less'
import Score from './charts/score'
import Line from './charts/line'
function User(props: any) {
  return (
    <div className={style.User}>
      <Score />
      <Line />
    </div>
  )
}

export default withRouter(User)