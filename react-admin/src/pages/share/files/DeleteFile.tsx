import { Button, Modal, Flex, Space } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined, MenuOutlined, SortAscendingOutlined, ProductOutlined } from '@ant-design/icons'
import { deleteFiles } from '@/api/share'
import Toast from '@/components/Toast'
import { useMemo } from 'react'
export default function DeleteFile(props: any) {
  const { selectedLists, handleOk } = props
  const selected = useMemo(() => selectedLists?.length, [selectedLists])
  const handleDelFile = async () => {
    const { data } = await deleteFiles(selectedLists)
    Toast.success('操作成功')
    handleOk()
  }
  const handleDelWarning = () => {
    Modal.confirm({
      title: '删除确认',
      content: '确认删除勾选的数据吗？',
      centered: true,
      footer: (
        <Flex gap="middle" align="end" vertical>
          <Space align="start">
            <Button color="orange" variant="outlined" onClick={() => Modal.destroyAll()}>
              取消
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                Modal.destroyAll()
                handleDelFile()
              }}
            >
              确定
            </Button>
          </Space>
        </Flex>
      )
    })
  }
  return (
    <>
      <Button icon={<DeleteOutlined />} type="primary" danger disabled={!selected} onClick={handleDelWarning}>
        删除
      </Button>
    </>
  )
}
