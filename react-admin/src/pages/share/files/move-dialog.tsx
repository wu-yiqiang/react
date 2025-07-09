import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber, Tree } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { File, FileItem } from '@/types/file'
import { DialogProps } from '@/types/common'
import { createFold, getDirTree, updateFileItem } from '@/api/share'
import { CarryOutOutlined } from '@ant-design/icons'
export default function MoveDialog(props: any) {
  const { open, ids, handleClose, handleOk } = props
  const [selectedKeys, setSelectedKeys] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [form] = Form.useForm()
  const close = () => {
    handleClose()
  }
  const submit = async () => {
    console.log('sss', selectedKeys)
    const params = {
      ids: ids,
      parent_id: selectedKeys[0]
    }
    await updateFileItem(params)
    Toast.success('操作成功')
    handleOk()
  }
  const handleSelect = (selectedKeys: number) => {
    setSelectedKeys(selectedKeys)
  }
  const init = async () => {
    const { data } = await getDirTree()
    const datas = data?.map((item: any) => {
      item.icon = <CarryOutOutlined />
      return item
    })
    setTreeData(datas)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal title="移动" width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} styles={{ body: { maxHeight: '400px', overflow: 'auto' } }} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : <Tree showLine={true} fieldNames={{ title: 'file_name', key: 'id' }} treeData={treeData} onSelect={handleSelect} />}
      </Spin>
    </Modal>
  )
}
