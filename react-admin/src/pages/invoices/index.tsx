import { Button } from "antd"
import useSystemStore from "@/store/index";
import { SystemStore } from "@/types/common";
export default function Invoices() {
// 假设 useSystemStore 返回的类型包含 userInfo 字段，这里进行类型断言
const { userInfo } = useSystemStore() as SystemStore
  return (
    <div>
      <Button
        type="primary"
      >
        新增
      </Button>
      <span>{userInfo?.username}单据管理</span>
    </div>
  );
}
