import { Form, Input, Modal, Upload, Row, Col, Spin, InputNumber, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { upload } from '@/api/public'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { requiredRules } from '@/validator/index'
import { DialogProps } from '@/types/common'
import Img from '@/components/Img'
import { cloneDeep } from 'lodash-es'
import { formattedAmountCent, formattedAmountCNY } from '@/utils'
import { getCommodityItem, getShopLists, postCommodityItem, updateCommodityItem } from '@/api/commodity'
import { Commodity } from '@/types/commodity'
export default function CommodityDialog(props: DialogProps) {
    const { open, id, handleClose, handleOk } = props
    const [editStatus, setEditStatus] = useState(false)
    const [title, setTitle] = useState('新增')
    const [loading, setLoading] = useState(false)
    const [shops, setShops] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [form] = Form.useForm()
    const close = () => {
        form.resetFields()
        handleClose()
    }
    const submit = async () => {
        const value = await form.validateFields()
        if (value) {
            const values = form.getFieldsValue()
            const reqParams = cloneDeep(values)
            reqParams.price = formattedAmountCent(reqParams?.price)
            if (!editStatus) {
                await postCommodityItem(reqParams)
                Toast.success('商品添加成功')

            }
            if (editStatus) {
                await updateCommodityItem(reqParams)
                Toast.success('商品编辑成功')
            }
            handleOk(values)
        }
    }
    const init = async () => {
        if (!id) {
            await setTitle('新增')
            setEditStatus(false)
            form.setFieldsValue(new Commodity())
        }
        if (id) {
            await setTitle('编辑')
            setEditStatus(true)
            setLoading(true)
            const response = await getCommodityItem(id)?.finally(() => {
                setLoading(false)
            })
            const data = response?.data
            if (!data) {
                Toast.error('未获取到数据')
                return
            }
            data.price = formattedAmountCNY(data?.price)
            form.setFieldsValue(data)
        }
    }
    useEffect(() => {
        init()
        getShops()
    }, [id])
    const handleUpload = async (info: object) => {
        // @ts-ignore
        const file = info?.file
        setLoading(true)
        const { data } = await upload(file).finally(() => {
            setLoading(false)
        })
        form.setFieldValue('fileName', data)
    }
    const beforeUpload = (file: File) => {
        const fileType = file?.type
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            Toast.error('请上传 JPEG 、JPG或PNG格式的图片')
            return Upload.LIST_IGNORE;
        }
        return true
    }
    const handlePreview = () => {
        setPreviewOpen(true)
    }
    const getShops = async () => {
        const data = await getShopLists()
        setShops(data?.data ?? [])
    }
    const avatar = useMemo(() => {
        return form?.getFieldValue('fileName')
    }, [form?.getFieldValue('fileName')])
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </button>
    )
    return (
        <Modal title={title} width={560} centered forceRender maskClosable={false} destroyOnHidden={true} open={open} onOk={submit} onCancel={close}>
            <Spin spinning={loading} size="large">
                {loading ? null : (
                    <Form id="form" form={form} labelAlign="left" labelCol={{ style: { width: 100 } }} layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <Form.Item label="商品图片" name="fileName" rules={requiredRules}>
                                    <Upload name="fileName" listType="picture-card" accept=".jpg,.jpeg,.png"
                                        showUploadList={false} onPreview={handlePreview}
                                        beforeUpload={(file: File) => beforeUpload(file)} maxCount={1} customRequest={handleUpload}>
                                        {avatar ? <Img fileName={avatar} previewOpen={previewOpen} /> : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="店铺名称" name="shopId" rules={requiredRules}>
                                    <Select options={shops} fieldNames={{ label: 'name', value: 'id' }}></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="商品名称" name="name" rules={requiredRules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="商品编号" name="code" rules={requiredRules}>
                                    <Input disabled={editStatus} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="商品价格" name="price" rules={requiredRules}>
                                    <InputNumber suffix="￥(RMB)" precision={2} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="商品库存" name="inventory" rules={requiredRules}>
                                    <InputNumber mode="spinner" min={0} style={{ width: '100%' }} precision={0} defaultValue={0} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Item hidden label="ID" name="id">
                                <Input hidden />
                            </Form.Item>
                        </Row>
                    </Form>
                )}
            </Spin>
        </Modal>
    )
}
