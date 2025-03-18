import { Button } from "antd"
import useSystemStore from "@/store/index";
export default function Invoices() {
  const { userInfo, setUserInfo } = useSystemStore();
  return (
    <div>
      <Button
        type="primary"
        onClick={(event: Event) =>
          setUserInfo({ username: "sutter" + Math.random() })
        }
      >
        新增
      </Button>
      <span>{userInfo?.username}单据管理</span>
    </div>
  );
}
