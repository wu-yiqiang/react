import {
  createBrowserRouter,
  Navigate,
  // redirect,
} from "react-router-dom";
import eventMitt from "@/utils/eventMitt";
import type { RouteObject } from "react-router-dom";
import Layout from "@/pages/layout/index";
import UserManager from "@/pages/system/users/index";
import Login from "@/pages/login/index";
import RoleManager from "@/pages/system/roles/index";
import PermissionManager from "@/pages/system/permissions/index";
import Invoices from "@/pages/invoices/index";
import Dashbord from "@/pages/dashbord/index";
import Statistics from "@/pages/statistics/index";
import Maintains from "@/pages/maintains/index";
import Schedules from "@/pages/schedules/index";
import MenuManager from '@/pages/system/menus/index'
import DaySchedule from '@/pages/schedules/DaySchedule'
import RoomsBook from "@/pages/rooms/rooms-book/index";
import RoomsType from '@/pages/rooms/rooms-type/index'
import RoomsStay from '@/pages/rooms/rooms-stay/index'
import RoomsInfo from "@/pages/rooms/rooms-info/index";
import {RouterItem} from '@/types/common'
import { AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, UsbOutlined, PrinterOutlined, PieChartOutlined, HeatMapOutlined, MenuOutlined, ScheduleOutlined, SafetyOutlined, ToolOutlined, ContactsOutlined } from '@ant-design/icons'
export const allRouters: Array<RouterItem> = [
  {
    path: '/dashbord',
    key: 'dashbord',
    label: '系统看板',
    icon: <AreaChartOutlined />,
    parentkey: '',
    showMenu: true,
    element: <Dashbord />
  },
  {
    path: '/statistics',
    label: '统计报表',
    icon: <PieChartOutlined />,
    key: 'statistics',
    parentkey: '',
    showMenu: true,
    element: <Statistics />
  },
  {
    path: '/invoices',
    label: '申请单据',
    icon: <PrinterOutlined />,
    key: 'invoices',
    parentkey: '',
    showMenu: true,
    element: <Invoices />
  },
  {
    path: '/maintains',
    label: '维修管理',
    icon: <ToolOutlined />,
    key: 'maintains',
    parentkey: '',
    showMenu: true,
    element: <Maintains />
  },
  {
    path: '/rooms',
    label: '房间管理',
    icon: <ContactsOutlined />,
    key: 'rooms',
    parentkey: '',
    showMenu: true,
    element: null
  },
  {
    path: '/rooms-book',
    label: '订房管理',
    icon: <ContactsOutlined />,
    key: 'rooms-book',
    parentkey: 'rooms',
    showMenu: true,
    element: <RoomsBook />
  },
  {
    path: '/rooms-type',
    label: '房间类型',
    icon: <ContactsOutlined />,
    key: 'rooms-type',
    parentkey: 'rooms',
    showMenu: true,
    element: <RoomsType />
  },
  {
    path: '/rooms-info',
    label: '房间信息',
    icon: <ContactsOutlined />,
    key: 'rooms-info',
    parentkey: 'rooms',
    showMenu: true,
    element: <RoomsInfo />
  },
  {
    path: '/rooms-stay',
    label: '入住管理',
    icon: <ContactsOutlined />,
    key: 'rooms-stay',
    parentkey: 'rooms',
    showMenu: true,
    element: <RoomsStay />
  },
  {
    path: '/schedules',
    label: '排班管理',
    icon: <ScheduleOutlined />,
    key: 'schedules',
    parentkey: '',
    showMenu: true,
    element: <Schedules />
  },
  {
    path: '/day-schedule',
    label: '每日排班',
    icon: <HeatMapOutlined />,
    key: 'day-schedule',
    parentkey: '',
    showMenu: false,
    element: <DaySchedule />
  },
  {
    path: '/setting',
    label: '系统设置',
    icon: <SettingOutlined />,
    key: 'setting',
    parentkey: '',
    showMenu: true,
    element: null
  },
  {
    path: '/user-manager',
    label: '用户管理',
    icon: <UserOutlined />,
    key: 'user-manager',
    parentkey: 'setting',
    showMenu: true,
    element: <UserManager />
  },
  {
    path: '/role-manager',
    label: '角色管理',
    icon: <TeamOutlined />,
    key: 'role-manager',
    parentkey: 'setting',
    showMenu: true,
    element: <RoleManager />
  },
  {
    path: '/menu-manager',
    label: '菜单管理',
    icon: <MenuOutlined />,
    key: 'menu-manager',
    parentkey: 'setting',
    showMenu: true,
    element: <MenuManager />
  },
  {
    path: '/permission-manager',
    label: '权限管理',
    icon: <SafetyOutlined />,
    key: 'permission-manager',
    parentkey: 'setting',
    showMenu: true,
    element: <PermissionManager />
  }
]
// const rootLoader = async () => {
//   const { permissionRouters, name, age, code } = await getUserInfo();
//   if (code == 401) {
//     return redirect("/login");
//   }
//   return {
//     name,
//     age,
//     permissionRouters,
//   };
// };

const routerConfig: RouteObject[] = [
  {
    path: "/",
    errorElement: <div>make error</div>,
    element: <Layout />,
    // loader: rootLoader,
    children: allRouters,
  },
];

const whiteLists: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="dashbord" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

export const routes = createBrowserRouter([...whiteLists, ...routerConfig]);

eventMitt.on('ROUTER:LOGOUT', () => {
  localStorage.clear()
  routes.navigate('/login')
})

eventMitt.on('ROUTER:LOGIN', (value: string) => {
  localStorage.setItem('token', value)
  routes.navigate('/')
})

eventMitt.on("ROUTER:HOME", () => {
  routes.navigate("/");
});

