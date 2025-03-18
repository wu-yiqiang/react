import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Layout from '@/pages/layout/index'
import { getUserInfo } from '@/api/user'
import UserManager from "@/pages/setting/users/index";
import Login from "@/pages/login/index";
import RoleManager from "@/pages/setting/roles/index";
import PermissionManager from "@/pages/setting/permissions/index";
import Invoices from "@/pages/invoices/index";
import Dashbord from "@/pages/dashbord/index";
import Statistics from "@/pages/statistics/index";
import { AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, UsbOutlined, PrinterOutlined, PieChartOutlined, VerifiedOutlined, FileOutlined, HeatMapOutlined, CarOutlined } from '@ant-design/icons'
export const allRouters: Array<any> = [
  {
    path: "/",
    element: <Dashbord />,
  },
  {
    path: "/dashbord",
    key: "dashbord",
    label: "看板",
    icon: <AreaChartOutlined />,
    parentkey: "",
    element: <Dashbord />,
  },
  {
    path: "/statistics",
    label: "统计",
    icon: <PieChartOutlined />,
    key: "statistics",
    parentkey: "",
    element: <Statistics />,
  },
  {
    path: "/invoices",
    label: "申请单",
    icon: <PrinterOutlined />,
    key: "invoices",
    parentkey: "",
    element: <Invoices />,
  },
  // {
  //   path: "/waste",
  //   label: "垃圾管理",
  //   icon: <HeatMapOutlined />,
  //   key: "waste",
  //   parentkey: "",
  //   element: <Contractor />,
  // },
  // {
  //   path: "/truck",
  //   label: "卡车",
  //   icon: <CarOutlined />,
  //   key: "truck",
  //   parentkey: "waste",
  //   element: <Truck />,
  // },
  // {
  //   path: "/driver",
  //   label: "司机",
  //   icon: <VerifiedOutlined />,
  //   key: "driver",
  //   parentkey: "waste",
  //   element: <Driver />,
  // },
  {
    path: "/setting",
    label: "设置",
    icon: <SettingOutlined />,
    key: "setting",
    parentkey: "",
    element: null,
  },
  {
    path: "/user-manager",
    label: "用户管理",
    icon: <UserOutlined />,
    key: "user-manager",
    parentkey: "setting",
    element: <UserManager />,
  },
  {
    path: "/role-manager",
    label: "角色管理",
    icon: <TeamOutlined />,
    key: "role-manager",
    parentkey: "setting",
    element: <RoleManager />,
  },
  {
    path: "/permission-manager",
    label: "权限管理",
    icon: <UsbOutlined />,
    key: "permission-manager",
    parentkey: "setting",
    element: <PermissionManager />,
  },
];
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
