import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Layout from '../config/layout/index'
import { getUserInfo } from '../api/user'
import UserManager from '../setting/user-manager'
const rootLoader = async () => {
  const { permissionRouters, name, age, code } = await getUserInfo()
  console.log('ssss', code)
  if (code == 10) {
    return redirect('/login')
  }
  return {
    name, age, permissionRouters
  }
}
const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="dashbord" />
  },
  {
    path: '/',
    errorElement: <div>make error</div>,
    element: <Layout />,
    loader: rootLoader,
    children: [
      {
        path: '/dashbord',
        element: <div>家目录</div>
      },
      {
        path: '/user-manager',
        element: <UserManager />
      },
      {
        path: '/testcase',
        element: '测试'
      }
    ]
  },
  {
    path: '/login',
    element: <div>登录页面</div>
  },
  {
    path: '*',
    element: <div>404</div>
  }
]

export const routes = createBrowserRouter(routerConfig)