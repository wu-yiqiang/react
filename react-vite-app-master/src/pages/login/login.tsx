import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import userInfoModel from '@/store/store'
import Button from '@material-ui/core/Button'
function Login(props: any) {
  const { changeToken, token } = userInfoModel()
  const login = () => {
    let redirect = decodeURIComponent(props.location.search.split('redirect=')[1]).split('&')
    let path = redirect[0]
    const data = redirect.length >= 2 ? JSON.parse(redirect[1]) : {}
    console.log('setToken', token)
    changeToken('eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxMzI3NzA4MjY3OCIsImV4cCI6MTYzNDM0NTcwMywidXNlcklkIjoiMjMyMl9fMl8wXzE2MzQyNTkzMDMifQ.pCmWnB_Gx00RaDAIX1gm8GbevL_B6U7N_xbVH1xf6pa1dY3TudnRcHNkMf4T9rBzaOGMyUbCvJn8FPFfQ9jXCw')
    props.history.replace({ pathname: path, ...data })
  }
  return (
    <div className="login">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          login()
        }}
      >
        登录
      </Button>
    </div>
  )
}

export default withRouter(Login)