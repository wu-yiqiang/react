import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { postUser, getUserDetail } from "@/api/system";
import { isEmpty } from 'lodash-es'
import { RoleItem, Role } from "@/types/role";
import { Row, Col, Radio, Tree, Card } from 'antd'
import Toast from '@/components/Toast'
import { emailRequiredRules, requiredRules } from "@/validator/index";
import type { TreeDataNode, TreeProps } from 'antd'
import { DialogProps } from "@/types/common";
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [title, setTitle] = useState("新增");
  const [form] = Form.useForm<RoleItem>();
  const close = () => {
    form.resetFields();
    handleClose();
  };
  const submit = async () => {
    const value = await form.validateFields();
    if (value) {
      const values = form.getFieldsValue();
      const datas = { ...values };
      console.log("sadasda", datas);
      if (!editStatus) await postUser(datas);
      // if (editStatus) await putContractor(target.uuid, datas)
      Toast.success("操作成功");
      handleOk(values);
    }
  };
  const fetchData = async (id: number) => {
    const response = await getUserDetail(id);
    return response?.data ?? {};
  };
  const init = async () => {
    if (isEmpty(id)) {
      setEditStatus(false);
      form.setFieldsValue(new Role());
      await setTitle("新增");
    }
    if (id) {
      setEditStatus(true);
      const data = await fetchData(id);
      await setTitle("编辑");
      form.setFieldsValue(data);
    }
  };
  useEffect(() => {
    init();
  }, [id]);
  const treeData: TreeDataNode[] = [
    {
      title: "系统看板",
      key: "dashboard",
    },
    {
      title: "统计报表",
      key: "statics",
    },
    {
      title: "系统管理",
      key: "system",
      children: [
        { title: "用户管理", key: "users" },
        { title: "角色管理", key: "roles" },
        { title: "菜单管理", key: "menus" },
      ],
    },
    {
      title: "单据管理",
      key: "0-0-1",
      children: [
        { title: "维修单据", key: "0-0-1-0" },
        { title: "0-0-1-1", key: "0-0-1-1" },
        { title: "0-0-1-2", key: "0-0-1-2" },
      ],
    },
    {
      title: "0-0-2",
      key: "0-0-2",
    },
    {
      title: "0-1",
      key: "0-1",
      children: [
        { title: "0-1-0-0", key: "0-1-0-0" },
        { title: "0-1-0-1", key: "0-1-0-1" },
        { title: "0-1-0-2", key: "0-1-0-2" },
      ],
    },
  ];
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    "0-0-0",
    "0-0-1",
  ]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const dataPermissionLists: TreeDataNode[] = [
    {
      title: "安东集团",
      key: "anton",
      children: [
        {
          title: "迪拜分公司",
          key: "dubai",
          children: [
            { title: "运维部门", key: "maintenance" },
            { title: "开发部门", key: "develop" },
            { title: "财务部门", key: "finance" },
            { title: "后勤部门", key: "logistics" },
          ],
        },
      ],
    },
  ];
  return (
    <Modal
      title={title}
      centered
      forceRender
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onOk={submit}
      onCancel={close}
    >
      <Form
        id="form"
        style={{ maxHeight: "500px", overflowY: "scroll", overflowX: "hidden" }}
        form={form}
        labelCol={{ span: "4" }}
        layout="inline"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="角色名称" name="name" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="角色标识" name="email" rules={emailRequiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="状态" name="status">
              <Radio.Group
                value={form.getFieldValue("status")}
                options={[
                  { value: 1, label: "启用" },
                  { value: 0, label: "禁用" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="菜单权限" name="email" rules={requiredRules}>
              <Card>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Card>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="数据权限" name="email" rules={requiredRules}>
              <Card>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={dataPermissionLists}
                />
              </Card>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
