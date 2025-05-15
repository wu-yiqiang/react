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
import Dashboard from "@/pages/dashboard/index";
import Statistics from "@/pages/statistics/index";
import Maintains from "@/pages/maintains/index";
import Schedules from "@/pages/schedules/index";
import MenuManager from '@/pages/system/menus/index'
import DaySchedule from '@/pages/schedules/DaySchedule'
import RoomsBook from "@/pages/rooms/rooms-book/index";
import RoomsType from '@/pages/rooms/rooms-type/index'
import RoomsStay from '@/pages/rooms/rooms-stay/index'
import RoomsInfo from "@/pages/rooms/rooms-info/index";
import Company from '@/pages/basicData/company/index'
import Position from '@/pages/basicData/position/index'
import Department from '@/pages/basicData/department/index'
import ButtonManager from '@/pages/system/buttons/index'
import Intelligent from "@/pages/intelligent";
import NotFound from "@/pages/error/404"
import NotPermission from '@/pages/error/403'
import { RouterItem, SystemStore } from '@/types/common'
import useSystemStore from '@/store/index'
import { AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, UsbOutlined, PrinterOutlined, PieChartOutlined, HeatMapOutlined, MenuOutlined, ScheduleOutlined, SafetyOutlined, ToolOutlined, ContactsOutlined, MenuUnfoldOutlined, DatabaseOutlined } from '@ant-design/icons'
import { logout } from '@/api/public'
const menus = (useSystemStore.getState() as SystemStore)?.userInfo?.menus
export const allRouters: Array<RouterItem> = [
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
    path: '/basicData',
    label: '数据管理',
    icon: <DatabaseOutlined />,
    key: 'BasicData',
    parentkey: '',
    element: null
  },
  {
    path: '/basicData/company',
    label: '公司管理',
    icon: <UserOutlined />,
    key: 'companys',
    parentkey: 'BasicData',
    element: <Company />
  },
  {
    path: '/basicData/position',
    label: '岗位管理',
    icon: <TeamOutlined />,
    key: 'positions',
    parentkey: 'BasicData',
    element: <Position />
  },
  {
    path: '/basicData/department',
    label: '部门管理',
    icon: <TeamOutlined />,
    key: 'departments',
    parentkey: 'BasicData',
    element: <Department />
  },
  {
    path: '/settings',
    label: '系统设置',
    icon: <SettingOutlined />,
    key: 'settings',
    parentkey: '',
    element: null
  },
  {
    path: '/settings/users',
    label: '用户管理',
    icon: <UserOutlined />,
    key: 'users',
    parentkey: 'settings',
    element: <UserManager />
  },
  {
    path: '/settings/roles',
    label: '角色管理',
    icon: <TeamOutlined />,
    key: 'roles',
    parentkey: 'settings',
    element: <RoleManager />
  },
  {
    path: '/settings/menus',
    label: '菜单管理',
    icon: <MenuOutlined />,
    key: 'menus',
    parentkey: 'settings',
    element: <MenuManager />
  },
  {
    path: '/settings/buttons',
    label: '按钮管理',
    icon: <MenuUnfoldOutlined />,
    key: 'buttons',
    parentkey: 'settings',
    element: <ButtonManager />
  },
  {
    path: '/settings/permissions',
    label: '权限管理',
    icon: <SafetyOutlined />,
    key: 'permissions',
    parentkey: 'settings',
    element: <PermissionManager />
  },
  {
    path: '/settings/intelligent',
    label: '智能应答',
    icon: <SafetyOutlined />,
    key: 'intelligent',
    parentkey: 'settings',
    element: <Intelligent />
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
    path: '/',
    errorElement: <div>make error</div>,
    element: <Layout />,
    // loader: rootLoader,
    children: allRouters?.filter((v) => menus?.some((val: any) => val.code == v.key))
    // children: allRouters
  }
]

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

export const routes = createBrowserRouter([...whiteLists, ...routerConfig]);

eventMitt.on('ROUTER:LOGOUT', () => {
  // await logout()
  routes.navigate('/login')
})

eventMitt.on("ROUTER:HOME", () => {
  routes.navigate("/");
});
eventMitt.on('ROUTER:BACK', () => {
  routes.navigate(-1)
})

// const getNodeAllParents = (lists: Array<object>, key: string | number) : any => {
//   const paths = [];
//   const currentItem = lists.find((item) => item.key == key);
//   paths.push(currentItem.key);
//   if (!currentItem.parentkey) return paths;
//   return paths.concat(getNodeAllParents(lists, currentItem.parentkey));
// };

eventMitt.on("ROUTER:KEY", (key: string) => {
  const routerItem = allRouters.find((item) => item.key === key) as RouterItem
  const path = routerItem?.path || '/'
  routes.navigate(path)
  useSystemStore.setState(() => ({
    selectMenu: [key]
  }))
});

