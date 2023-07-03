import { useState,useEffect } from 'react'
import { withRouter, Prompt, useHistory } from 'react-router-dom'
import style from './index.module.less'

function User(props: any) {
  return (
    <div className={style.User}>
      用户数据分析
    </div>
  )
}

export default withRouter(User)