// import React, { useEffect, useMemo, useCallback } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import style from './index.module.less'
function Home(props: any) {
  return (
    <div className={style.Home}>
      <Button variant="contained" color="primary">
        你好，世界
      </Button>
      <Button variant="contained" color="primary">
        你好，世界
      </Button>
    </div>
  )
}

export default withRouter(Home)
