import { Button } from "antd"
import useSystemStore from "@/store/index";
export default function Apply() {
  const { userInfo, setUserInfo } = useSystemStore();
  return (
    <div>
      <Button type="primary" onClick={(event: Event) => setUserInfo({username: 'sutter'+Math.random()})}>
        新增
      </Button>
      <span>{userInfo?.username}</span>
    </div>
  );
}
