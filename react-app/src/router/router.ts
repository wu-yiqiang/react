import React from 'react'
// 组件
const Home = React.lazy(() => import('@/pages/home/index')) // 路由懒加载
const Sport = React.lazy(() => import('@/pages/sport/index'))
const Login = React.lazy(() => import('@/pages/login/index'))
const User = React.lazy(() => import('@/pages/user/index'))
const Miss = React.lazy(() => import('@/pages/404/index'))

const routerMap:any[] = [
  {
    path: '/',
    redirect: '/home',
    auth: false,
    footerShow: true
  },
  {
    path: '/home',
    component: Home,
    auth: false,
    footerShow: true
  },
  {
    path: '/sport',
    component: Sport,
    auth: false,
    footerShow: true
  },
  {
    path: '/login',
    component: Login,
    auth: false,
    footerShow: false
  },
  {
    path: '/user',
    component: User,
    auth: true,
    footerShow: true
  },
  {
    path: '/404',
    component: Miss,
    auth: false,
    footerShow: false
  },
]

export default routerMap