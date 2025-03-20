import {
  createBrowserRouter,
  Navigate,
  redirect,
  Route,
  Router,
  useNavigate,
} from "react-router-dom";
import eventMitt from "@/utils/eventMitt";
import type { RouteObject } from "react-router-dom";
import Layout from "@/pages/layout/index";
import { getUserInfo } from "@/api/user";
import UserManager from "@/pages/settings/users/index";
import Login from "@/pages/login/index";
import RoleManager from "@/pages/settings/roles/index";
import PermissionManager from "@/pages/settings/permissions/index";
import Invoices from "@/pages/invoices/index";
import Dashbord from "@/pages/dashbord/index";
import Statistics from "@/pages/statistics/index";
import Rooms from "@/pages/rooms/index";
import Maintains from "@/pages/maintains/index";
import Schedules from "@/pages/schedules/index";
import DaySchedule from '@/pages/schedules/DaySchedule'
import {
  AreaChartOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  UsbOutlined,
  PrinterOutlined,
  PieChartOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
export const allRouters: Array<any> = [
  {
    path: '/dashbord',
    key: 'dashbord',
    label: '看板',
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
    icon: <HeatMapOutlined />,
    key: 'maintains',
    parentkey: '',
    showMenu: true,
    element: <Maintains />
  },
  {
    path: '/rooms',
    label: '房间管理',
    icon: <HeatMapOutlined />,
    key: 'rooms',
    parentkey: '',
    showMenu: true,
    element: <Rooms />
  },
  {
    path: '/schedules',
    label: '排班管理',
    icon: <HeatMapOutlined />,
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
    label: '设置',
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
    path: '/permission-manager',
    label: '权限管理',
    icon: <UsbOutlined />,
    key: 'permission-manager',
    parentkey: 'setting',
    showMenu: true,
    element: <PermissionManager />
  }
]
const rootLoader = async () => {
  const { permissionRouters, name, age, code } = await getUserInfo();
  if (code == 401) {
    return redirect("/login");
  }
  return {
    name,
    age,
    permissionRouters,
  };
};

const routerConfig: RouteObject[] = [
  {
    path: "/",
    errorElement: <div>make error</div>,
    element: <Layout />,
    loader: rootLoader,
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

eventMitt.on("ROUTER:LOGIN", () => {
  const navigate = useNavigate();
  navigate("/login");
  console.log("login");
});
