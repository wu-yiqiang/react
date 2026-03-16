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
// 商品管理
const CommodityLists = React.lazy(() => import('@/pages/commodities/commodityLists'))
const Shops = React.lazy(() => import('@/pages/commodities/shops'))
// 订单管理
const OrderLists = React.lazy(() => import('@/pages/orders/orderLists'))

// System
const Users = React.lazy(() => import('@/pages/system/users/index'))
const Roles = React.lazy(() => import('@/pages/system/roles/index'))
const Menus = React.lazy(() => import('@/pages/system/menus/index'))
const Buttons = React.lazy(() => import('@/pages/system/buttons/index'))
const Connectors = React.lazy(() => import('@/pages/system/connectors/index'))
const Mappings = React.lazy(() => import('@/pages/system/mappings/index'))
// Datas
const Companys = React.lazy(() => import('@/pages/basicData/companys/index'))
const Positions = React.lazy(() => import('@/pages/basicData/positions/index'))
const Departments = React.lazy(() => import('@/pages/basicData/departments/index'))
const Intelligent = React.lazy(() => import('@/pages/intelligent/index'))

// File
const Files = React.lazy(() => import('@/pages/share/files/index'))


// 
const Dashboard = React.lazy(() => import('@/pages/dashboard/index'))
const Statistics = React.lazy(() => import('@/pages/statistics/index'))
const Schedules = React.lazy(() => import('@/pages/schedules/index'))
const DaySchedule = React.lazy(() => import('@/pages/schedules/index'))


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
    path: '/commodities',
    label: '商品管理',
    icon: <PieChartOutlined />,
    key: 'commodities',
    parentkey: '',
    element: null
  },
  {
    path: '/commodities/shops',
    label: '店铺列表',
    icon: <PieChartOutlined />,
    key: 'shops',
    parentkey: 'commodities',
    element: <Shops />
  },
  {
    path: '/commodities/lists',
    label: '商品列表',
    icon: <PieChartOutlined />,
    key: 'commodityLists',
    parentkey: 'commodities',
    element: <CommodityLists />
  },
  {
    path: '/orders',
    label: '订单管理',
    icon: <PieChartOutlined />,
    key: 'orders',
    parentkey: '',
    element: null
  },
  {
    path: '/orders/lists',
    label: '订单列表',
    icon: <PieChartOutlined />,
    key: 'orderLists',
    parentkey: 'orders',
    element: <OrderLists />
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
    path: '/shares',
    label: '共享中心',
    icon: <SettingOutlined />,
    key: 'shares',
    parentkey: '',
    element: null
  },
  {
    path: '/shares/file',
    label: '文件共享',
    icon: <UserOutlined />,
    key: 'files',
    parentkey: 'shares',
    element: <Files />
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
    path: '/systems/connectors',
    label: '接口管理',
    icon: <SafetyOutlined />,
    key: 'connectors',
    parentkey: 'systems',
    element: <Connectors />
  },
  {
    path: '/systems/mappings',
    label: '字典管理',
    icon: <SafetyOutlined />,
    key: 'mappings',
    parentkey: 'systems',
    element: <Mappings />
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

export const routes = createBrowserRouter([...whiteLists, ...routerConfig], {
  basename: '/jxms'
})

eventMitt.on('ROUTER:LOGOUT', async () => {
  routes.navigate('/login')
})

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

