import React from 'react'
// 组件
const Home = React.lazy(() => import('@/pages/home/index')) // 路由懒加载
const Sport = React.lazy(() => import('@/pages/sport/index'))
const Login = React.lazy(() => import('@/pages/login/index'))
const User = React.lazy(() => import('@/pages/user/index'))
const Miss = React.lazy(() => import('@/pages/404/index'))

const routerMap: any[] = [
  {
    path: '/',
    redirect: '/home',
    auth: true,
  },
  {
    path: '/home',
    component: Home,
    auth: true,
    title: '首页',
    footerShow: true,
    meta: {
      icon: 'home'
    }
  },
  {
    path: '/sport',
    component: Sport,
    auth: true,
    title: '运动',
    footerShow: true,
    meta: {
      icon: 'sport'
    }
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
    footerShow: false,
    title: '用户',
    meta: {
      icon: 'user'
    }
  },
  {
    path: '/404',
    component: Miss,
    auth: false,
    footerShow: false
  }
]

export default routerMap