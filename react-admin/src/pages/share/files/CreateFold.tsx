import { FolderAddOutlined } from '@ant-design/icons'
import { Button, Upload, Input, Checkbox } from 'antd'
import CreateFoldDialog from './createFoldDialog'
import { FileItem } from '@/types/file'
import { useEffect, useMemo, useState } from 'react'

export default function CreateFold(props: any) {
  const { current_id, handleOk } = props
  const [visible, setVisible] = useState(false)

  const handleCreateFold = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleSubmit = async (value: FileItem) => {
    handleClose()
    handleOk()
  }
  return (
    <>
      <Button icon={<FolderAddOutlined />} onClick={handleCreateFold}>
        新建文件夹
      </Button>
      {visible ? <CreateFoldDialog open={visible} current_id={current_id} handleClose={handleClose} handleOk={handleSubmit} /> : null}
    </>
  )
}
