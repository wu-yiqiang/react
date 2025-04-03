import { Form, Input, Modal, Upload, Select, Row, Col } from "antd";
import { useEffect, useState } from 'react'
import { postUser, updateUserDetail, getUserDetail } from '@/api/settings'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  emailRequiredRules,
  requiredRules,
} from "@/validator/index";
import { User } from "@/types/user";
import {DialogProps} from '@/types/common'
export default function UserAddDialog(props: DialogProps) {
  const { open, id,handleClose, handleOk } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [title, setTitle] = useState("新增");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const close = () => {
    form.resetFields();
    handleClose();
  };
  const submit = async () => {
    const value = await form.validateFields();
    if (value) {
      const values = form.getFieldsValue();
      if (!editStatus) await postUser(values);
      if (editStatus) await updateUserDetail(values);
      Toast.success("操作成功");
      handleOk(values);
    }
  };
  const init = async () => {
    if (!id) {
      setEditStatus(false);
      form.setFieldsValue(new User());
      await setTitle("新增");
    }
    if (id) {
      setEditStatus(true);
      const response = await getUserDetail(id);
      const data = response?.data;
      if (!data) {
        console.error("未获取到用户数据");
        return;
      }
      await setTitle("编辑");
      form.setFieldsValue(data);
    }
  };
  useEffect(() => {
    init();
  }, [id]);
  const handleUploadDone = async (info: object) => {
    console.log("sds", info);
    setLoading(false);
  };
  const beforeUpload = (file: File) => {
    // return new Promise((resolve) => {
    //   const fileType = file?.type;
    //   if (fileType !== "image/jpeg" && fileType !== "image/png") {
    //     Toast.error("请上传 JPEG 或 PNG 格式的图片");
    //     return resolve(false);
    //   }
    //   return resolve(true);
    // });
    const fileType = file?.type;
    if (fileType !== "image/jpeg" && fileType !== "image/png") {
      Toast.error("请上传 JPEG 或 PNG 格式的图片");
      return false;
    }
    return true;
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );
  return (
    <Modal
      title={title}
      width={800}
      centered
      forceRender
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onOk={submit}
      onCancel={close}
    >
      <Form id="form" form={form} labelCol={{ span: "4" }} layout="inline">
        <Row>
          <Col span={12}>
            <Form.Item label="头像" name="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file: File) => beforeUpload(file)}
                onChange={handleUploadDone}
              >
                {form?.getFieldValue("avatar") ? (
                  <img
                    src={form?.getFieldValue("avatar")}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="姓名" name="username" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="邮箱" name="email" rules={emailRequiredRules}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="号码" name="phone_number" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="状态" name="status" rules={requiredRules}>
              <Select>
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Disabled</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {/* <Col span={12}>
            <Form.Item label="角色" name="email" rules={requiredRules}>
              <Select>
                <Select.Option value="sample">Sample</Select.Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item label="密码" name="password" rules={requiredRules}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Form.Item hidden label="ID" name="id">
            <Input hidden />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
}
