import {
  createBrowserRouter,
  Navigate,
  // redirect,
} from "react-router-dom";
import React from 'react'
import eventMitt from "@/utils/eventMitt";
import type { RouteObject } from "react-router-dom";
import useSystemStore from '@/store/index'
import { RouterItem, SystemStore } from '@/types/common'
import { AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, HomeOutlined, PrinterOutlined, PieChartOutlined, HeatMapOutlined, MenuOutlined, ScheduleOutlined, SafetyOutlined, ToolOutlined, ContactsOutlined, MenuUnfoldOutlined, DatabaseOutlined } from '@ant-design/icons'
import LoadError from '@/pages/error/500'
const NotFound = React.lazy(() => import('@/pages/error/404'))
const NotPermission = React.lazy(() => import('@/pages/error/403'))
const Layout = React.lazy(() => import('@/pages/layout/index'))
const Login = React.lazy(() => import('@/pages/login/index'))
// Personal Center
const PersonalCenter = React.lazy(() => import('@/pages/personalCenter/index'))
// System
const Users = React.lazy(() => import('@/pages/system/users/index'))
const Roles = React.lazy(() => import('@/pages/system/roles/index'))
const Menus = React.lazy(() => import('@/pages/system/menus/index'))
const Buttons = React.lazy(() => import('@/pages/system/buttons/index'))
const Intefaces = React.lazy(() => import('@/pages/system/intefaces/index'))
const Dictionarys = React.lazy(() => import('@/pages/system/dictionarys/index'))
// Datas
const Companys = React.lazy(() => import('@/pages/basicData/companys/index'))
const Positions = React.lazy(() => import('@/pages/basicData/positions/index'))
const Departments = React.lazy(() => import('@/pages/basicData/departments/index'))
const Intelligent = React.lazy(() => import('@/pages/intelligent/index'))

// File
const Doeuments = React.lazy(() => import('@/pages/files/documents/index'))

//
const Invoices = React.lazy(() => import('@/pages/invoices/index'))
const Dashboard = React.lazy(() => import('@/pages/dashboard/index'))
const Statistics = React.lazy(() => import('@/pages/statistics/index'))
const Maintains = React.lazy(() => import('@/pages/maintains/index'))
const Schedules = React.lazy(() => import('@/pages/schedules/index'))
const DaySchedule = React.lazy(() => import('@/pages/schedules/index'))
const RoomsBook = React.lazy(() => import('@/pages/rooms/rooms-book/index'))
const RoomsType = React.lazy(() => import('@/pages/rooms/rooms-type/index'))
const RoomsStay = React.lazy(() => import('@/pages/rooms/rooms-stay/index'))
const RoomsInfo = React.lazy(() => import('@/pages/rooms/rooms-info/index'))


import { logout } from '@/api/public'
const menus = (useSystemStore.getState() as SystemStore)?.userInfo?.menus
const whiteLists: RouteObject[] = [
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/403',
    element: <NotPermission />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
export const allRouters: Array<RouterItem> = [
  {
    path: '/personal',
    key: 'personal',
    label: '个人中心',
    icon: <HomeOutlined />,
    parentkey: '',
    element: <PersonalCenter />
  },
  {
    path: '/dashboard',
    key: 'dashboard',
    label: '系统看板',
    icon: <AreaChartOutlined />,
    parentkey: '',
    element: <Dashboard />
  },
  {
    path: '/statistics',
    label: '统计报表',
    icon: <PieChartOutlined />,
    key: 'statistics',
    parentkey: '',
    element: <Statistics />
  },
  {
    path: '/invoices',
    label: '申请单据',
    icon: <PrinterOutlined />,
    key: 'invoices',
    parentkey: '',
    element: <Invoices />
  },
  {
    path: '/maintains',
    label: '维修管理',
    icon: <ToolOutlined />,
    key: 'maintains',
    parentkey: '',
    element: <Maintains />
  },
  {
    path: '/rooms',
    label: '房间管理',
    icon: <ContactsOutlined />,
    key: 'rooms',
    parentkey: '',
    element: null
  },
  {
    path: '/rooms-book',
    label: '订房管理',
    icon: <ContactsOutlined />,
    key: 'rooms-book',
    parentkey: 'rooms',
    element: <RoomsBook />
  },
  {
    path: '/rooms-type',
    label: '房间类型',
    icon: <ContactsOutlined />,
    key: 'rooms-type',
    parentkey: 'rooms',
    element: <RoomsType />
  },
  {
    path: '/rooms-info',
    label: '房间信息',
    icon: <ContactsOutlined />,
    key: 'rooms-info',
    parentkey: 'rooms',
    element: <RoomsInfo />
  },
  {
    path: '/rooms-stay',
    label: '入住管理',
    icon: <ContactsOutlined />,
    key: 'rooms-stay',
    parentkey: 'rooms',
    element: <RoomsStay />
  },
  {
    path: '/schedules',
    label: '班次管理',
    icon: <ScheduleOutlined />,
    key: 'schedules',
    parentkey: '',
    element: null
  },
  {
    path: '/schedules/schedules-lists',
    label: '排班列表',
    icon: <ScheduleOutlined />,
    key: 'schedules-lists',
    parentkey: 'schedules',
    element: <Schedules />
  },
  {
    path: '/schedules/daySchedule',
    label: '每日排班',
    icon: <HeatMapOutlined />,
    key: 'daySchedule',
    parentkey: 'schedules',
    element: <DaySchedule />
  },
  {
    path: '/datas',
    label: '数据管理',
    icon: <DatabaseOutlined />,
    key: 'datas',
    parentkey: '',
    element: null
  },
  {
    path: '/datas/companys',
    label: '公司管理',
    icon: <UserOutlined />,
    key: 'companys',
    parentkey: 'datas',
    element: <Companys />
  },
  {
    path: '/datas/positions',
    label: '岗位管理',
    icon: <TeamOutlined />,
    key: 'positions',
    parentkey: 'datas',
    element: <Positions />
  },
  {
    path: '/datas/departments',
    label: '部门管理',
    icon: <TeamOutlined />,
    key: 'departments',
    parentkey: 'datas',
    element: <Departments />
  },
  {
    path: '/files',
    label: '文件管理',
    icon: <SettingOutlined />,
    key: 'files',
    parentkey: '',
    element: null
  },
  {
    path: '/files/documents',
    label: '文档管理',
    icon: <UserOutlined />,
    key: 'documents',
    parentkey: 'files',
    element: <Doeuments />
  },
  {
    path: '/systems',
    label: '系统设置',
    icon: <SettingOutlined />,
    key: 'systems',
    parentkey: '',
    element: null
  },

  {
    path: '/systems/users',
    label: '用户管理',
    icon: <UserOutlined />,
    key: 'users',
    parentkey: 'systems',
    element: <Users />
  },
  {
    path: '/systems/roles',
    label: '角色管理',
    icon: <TeamOutlined />,
    key: 'roles',
    parentkey: 'systems',
    element: <Roles />
  },
  {
    path: '/systems/menus',
    label: '菜单管理',
    icon: <MenuOutlined />,
    key: 'menus',
    parentkey: 'systems',
    element: <Menus />
  },
  {
    path: '/systems/buttons',
    label: '按钮管理',
    icon: <MenuUnfoldOutlined />,
    key: 'buttons',
    parentkey: 'systems',
    element: <Buttons />
  },
  {
    path: '/systems/inteface',
    label: '接口管理',
    icon: <SafetyOutlined />,
    key: 'intefaces',
    parentkey: 'systems',
    element: <Intefaces />
  },
  {
    path: '/systems/dictionarys',
    label: '字典管理',
    icon: <SafetyOutlined />,
    key: 'dictionarys',
    parentkey: 'systems',
    element: <Dictionarys />
  },
  {
    path: '/systems/intelligent',
    label: '智能应答',
    icon: <SafetyOutlined />,
    key: 'intelligents',
    parentkey: 'systems',
    element: <Intelligent />
  }
]

const routerConfig: RouteObject[] = [
  {
    path: '/',
    errorElement: <LoadError />,
    element: <Layout />,
    // children: allRouters
    children: allRouters?.filter((v) => menus?.some((val: any) => val.code == v.key))
  }
]

export const routes = createBrowserRouter([...whiteLists, ...routerConfig]);

eventMitt.on('ROUTER:LOGOUT', () => {
  // await logout()
  routes.navigate('/login')
})

// eventMitt.on("ROUTER:HOME", () => {
//   // routes.navigate("/");
//   routes.navigate('/personal')
// });
eventMitt.on('ROUTER:BACK', () => {
  routes.navigate(-1)
})


eventMitt.on("ROUTER:KEY", (key: string) => {
  const routerItem = allRouters.find((item) => item.key === key) as RouterItem
  const path = routerItem?.path || '/404'
  routes.navigate(path)
  useSystemStore.setState(() => ({
    selectMenu: [key]
  }))
});

