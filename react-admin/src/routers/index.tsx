import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Layout from '@/layout/index'
import { getUserInfo } from '@/api/user'
import UserManager from '@/setting/user-manager'
import Login from '@/login/index'
import RoleManager from '@/setting/role-manager'
import PermissionManager from '@/setting/permission-manager'
import Sensor1 from '@/sensor/sensor1'
import Sensor2 from '@/sensor/sensor2'
import Draw1 from '@/draw/draw1'
import Draw2 from '@/draw/draw2'
import Dashbord from '@/dashbord/index'
import {AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, UsbOutlined } from '@ant-design/icons'
export let allRouters: Array<any> = [
  {
    path: '/dashbord',
    key: 'dashbord',
    label: '看板',
    icon: <AreaChartOutlined />,
    parentkey: '',
    element: <Dashbord />
  },
  {
    path: '/sensor',
    label: '传感器管理',
    icon: <SettingOutlined />,
    key: 'sensor',
    parentkey: '',
    element: null
  },
  {
    path: '/sensor1',
    label: '传感器1',
    icon: <SettingOutlined />,
    key: 'sensor1',
    parentkey: 'sensor',
    element: <Sensor1 />
  },
  {
    path: '/sensor2',
    label: '传感器2',
    icon: <SettingOutlined />,
    key: 'sensor2',
    parentkey: 'sensor',
    element: <Sensor2 />
  },
  {
    path: '/draw',
    label: '图纸管理',
    icon: <SettingOutlined />,
    key: 'draw',
    parentkey: '',
    element: null
  },
  {
    path: '/draw1',
    label: '图纸1',
    icon: <SettingOutlined />,
    key: 'draw1',
    parentkey: 'draw',
    element: <Draw1 />
  },
  {
    path: '/draw2',
    label: '图纸2',
    icon: <SettingOutlined />,
    key: 'draw2',
    parentkey: 'draw',
    element: <Draw2 />
  },
  {
    path: '/setting',
    label: '设置',
    icon: <SettingOutlined />,
    key: 'setting',
    parentkey: '',
    element: null
  },
  {
    path: '/user-manager',
    label: '用户管理',
    icon: <UserOutlined />,
    key: 'user-manager',
    parentkey: 'setting',
    element: <UserManager />
  },
  {
    path: '/role-manager',
    label: '角色管理',
    icon: <TeamOutlined />,
    key: 'role-manager',
    parentkey: 'setting',
    element: <RoleManager />
  },
  {
    path: '/permission-manager',
    label: '权限管理',
    icon: <UsbOutlined />,
    key: 'permission-manager',
    parentkey: 'setting',
    element: <PermissionManager />
  }
]
let router = []
const rootLoader = async () => {
  const { permissionRouters, name, age, code } = await getUserInfo()
  if (code == 401) {
    return redirect('/login')
  }
  return {
    name,
    age,
    permissionRouters
  }
}

const routerConfig: RouteObject[] = [
  {
    path: '/',
    errorElement: <div>make error</div>,
    element: <Layout />,
    loader: rootLoader,
    children: allRouters
  }
]

const whiteLists: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="dashbord" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div>
  }
]

export const routes = createBrowserRouter([...whiteLists, ...routerConfig])