import { Button, Modal, Flex, Space } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined, MenuOutlined, SortAscendingOutlined, ProductOutlined } from '@ant-design/icons'
import { deleteFiles } from '@/api/share'
import Toast from '@/components/Toast'
import MoveDialog from './MoveDialog'
import { useMemo, useState } from 'react'
export default function MoveFile(props: any) {
  const { selectedLists, handleOk } = props
  const [visible, setVisible] = useState(false)
  const selected = useMemo(() => selectedLists?.length, [selectedLists])
  const handleOpenMove = () => {
    setVisible(true)
  }
  const handleMoveClose = () => {
    setVisible(false)
  }
  const handleMoveSubmit = () => {
    handleMoveClose()
    handleOk()
  }
  return (
    <>
      <Button icon={<SwapOutlined />} type="primary" ghost disabled={!selected} onClick={handleOpenMove}>
        移动
      </Button>
      {visible ? <MoveDialog open={visible} handleClose={handleMoveClose} handleOk={handleMoveSubmit} ids={selectedLists} /> : null}
    </>
  )
}
