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
import NotFound from "@/pages/error/404"
import NotPermission from '@/pages/error/403'
import { RouterItem } from '@/types/common'
import useSystemStore from '@/store/index'
import { AreaChartOutlined, SettingOutlined, UserOutlined, TeamOutlined, UsbOutlined, PrinterOutlined, PieChartOutlined, HeatMapOutlined, MenuOutlined, ScheduleOutlined, SafetyOutlined, ToolOutlined, ContactsOutlined } from '@ant-design/icons'
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
    label: '排班管理',
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
    path: '/schedules/day-schedule',
    label: '每日排班',
    icon: <HeatMapOutlined />,
    key: 'day-schedule',
    parentkey: 'schedules',
    element: <DaySchedule />
  },
  {
    path: '/setting',
    label: '系统设置',
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
    path: '/menu-manager',
    label: '菜单管理',
    icon: <MenuOutlined />,
    key: 'menu-manager',
    parentkey: 'setting',
    element: <MenuManager />
  },
  {
    path: '/permission-manager',
    label: '权限管理',
    icon: <SafetyOutlined />,
    key: 'permission-manager',
    parentkey: 'setting',
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
    path: '/',
    element: <Navigate to="dashboard" />
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
  console.log("token过期")
  routes.navigate('/login')
})

eventMitt.on("ROUTER:HOME", () => {
  routes.navigate("/");
});
eventMitt.on('ROUTER:BACK', () => {
  routes.navigate(-1)
})

const getNodeAllParents = (lists: Array<object>, key: string | number) => {
  let paths = [];
  const currentItem = lists.find((item) => item.key == key);
  paths.push(currentItem.key);
  if (!currentItem.parentkey) return paths;
  return paths.concat(getNodeAllParents(lists, currentItem.parentkey));
};

eventMitt.on("ROUTER:KEY", (key: string) => {
  const routerItem = allRouters.find((item) => item.key === key) as RouterItem;
  const path = routerItem?.path || "/";
  routes.navigate(path);
  const parentsMenus = getNodeAllParents(allRouters, routerItem.key);
  console.log("sdsd", parentsMenus)
  // sessionStorage.setItem('openMunus', JSON.stringify(parentsMenus))
  useSystemStore.setState(() => ({
    openMenu: parentsMenus
  }))
});

