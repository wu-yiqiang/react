import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber, Tree } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { createFold, getDirTree, updateFileItem } from '@/api/share'
import DirectoryTree from 'antd/es/tree/DirectoryTree'
import { Key } from 'antd/es/table/interface'
export default function MoveDialog(props: any) {
  const { open, ids, handleClose, handleOk } = props
  const [selectedKeys, setSelectedKeys] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState<any>([])
  const [form] = Form.useForm()
  const close = () => {
    handleClose()
  }
  const submit = async () => {
    const keys = selectedKeys[0]  == 'null' ? null : selectedKeys[0]
    const params = {
      ids: ids,
      parent_id: keys
    }
    await updateFileItem(params)
    Toast.success('操作成功')
    handleOk()
  }
  const handleSelect = (selectedKeys: Key[]) => {
    setSelectedKeys(selectedKeys) 
  }
  const init = async () => {
    const { data } = await getDirTree()
    const root = [
      {
        file_name: 'net_disk',
        id: 'null',
        children: data ?? []
      }
    ]
    console.log("sss", root)
    setTreeData(root ?? [])
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal title="移动" width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} styles={{ body: { maxHeight: '400px', overflow: 'auto' } }} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : <DirectoryTree multiple showLine={true} fieldNames={{ title: 'file_name', key: 'id' }} treeData={treeData} onSelect={handleSelect} />}
      </Spin>
    </Modal>
  )
}
