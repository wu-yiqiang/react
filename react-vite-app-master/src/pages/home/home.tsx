import React, { useEffect, useMemo, useCallback } from 'react'
import useCounterModel from '@/store/store'
import { withRouter, Link } from 'react-router-dom'
import HelloWord from 'components/helloWord/helloWord'
import Child from 'components/child/child'
import Button from '@material-ui/core/Button'

function Home(props: any) {
  const model = useCounterModel()

  // window.hasOwnProperty('$cancelRequest') ? window.$cancelRequest() : ''

  const double = useMemo(() => {
    return model.count * 2
  }, [model.count === 3])

  const HelloWordClick = useCallback(() => {
    console.log('HelloWordClick')
  }, [])

  const childClick = useCallback(() => {
    console.log('childClick')
  }, [])

  useEffect(() => {
    console.log('值变了')
  }, [model.count])

  return (
    <div className="Home">
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
