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
    path: "/dashbord",
    key: "dashbord",
    label: "看板",
    icon: <AreaChartOutlined />,
    parentkey: "",
    element: <Dashbord />,
  },
  {
    path: "/statistics",
    label: "统计报表",
    icon: <PieChartOutlined />,
    key: "statistics",
    parentkey: "",
    element: <Statistics />,
  },
  {
    path: "/invoices",
    label: "申请单据",
    icon: <PrinterOutlined />,
    key: "invoices",
    parentkey: "",
    element: <Invoices />,
  },
  {
    path: "/maintains",
    label: "维修管理",
    icon: <HeatMapOutlined />,
    key: "maintains",
    parentkey: "",
    element: <Maintains />,
  },
  {
    path: "/rooms",
    label: "房间管理",
    icon: <HeatMapOutlined />,
    key: "rooms",
    parentkey: "",
    element: <Rooms />,
  },
  {
    path: "/schedules",
    label: "排班管理",
    icon: <HeatMapOutlined />,
    key: "schedules",
    parentkey: "",
    element: <Schedules />,
  },
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
