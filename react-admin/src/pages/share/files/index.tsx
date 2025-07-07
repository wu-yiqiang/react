import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileIter from './FileIter'
import { Button, Upload, Input, Modal, Row, Col, Space, Breadcrumb, Flex } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined, MenuOutlined, SortAscendingOutlined, ProductOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from "react";
import CreareFold from './create-fold-dialog'
import MoveDialog from './move-dialog'
import { FileItem } from '@/types/file'
import {deleteFiles, getFiles} from '@/api/share'
import Toast from "@/components/Toast";
export default function DocumentManager() {
  const [visible, setVivible] = useState(false)
  const [menuMode, setMenuMode] = useState(true)
  const [moveVisible, setMoveVisible] = useState(false)
  const [currentPath, setCurrentPath] = useState([
    {
      fileName: 'net_disk',
      id: null
    }
  ])
  const [selectedLists, setSelectedLists] = useState([])
  const [files, setFiles] = useState([])
  const handleCreateFold = () => {
    setVivible(true)
  }
  const handleClose = () => {
    setVivible(false)
  }
  const handleSubmit = async (value: FileItem) => {
    await getCurrentPathFiles()
    handleClose()
  }
  const handleSelect = (value: number) => {
    setSelectedLists([...selectedLists, value])
  }
  const selected = useMemo(() => selectedLists?.length, [selectedLists])
  const handleUnSelect = (value: number) => {
    const data = selectedLists?.filter(i => i != value)
    setSelectedLists(data)
  }
  const handleModeChange = () => {
    setMenuMode(!menuMode)
  }
  const getCurrentPathFiles = async () => {
    const { data } = await getFiles(currentPath[currentPath?.length -1]?.id)
    setFiles(data ?? [])
  }
  const handleSelectPath = (value: FileItem) => {
    setCurrentPath([...currentPath, value])
  }
  const handlePathChange = (value: Number) => {
    const paths = currentPath.splice(0, value + 1)
    setCurrentPath(paths)
  }
  const handleDelFile = async () => {
    const { data } = await deleteFiles(selectedLists)
    Toast.success('操作成功')
    setSelectedLists([])
    getCurrentPathFiles()
  }
  const handleMoveSubmit = () => { 
    handleMoveClose()
  }
  const handleMoveClose = () => {
    setMoveVisible(false)
  }
  const handleOpenMove = () => {
    setMoveVisible(true)
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
  useEffect(() => {
    getCurrentPathFiles()
  }, [currentPath])
  const handleSort = () => {}
  return (
    <div className="Files">
      <div className="topbar">
        <Upload>
          <Button icon={<UploadOutlined />} type="primary">
            上传
          </Button>
        </Upload>
        <Button icon={<FolderAddOutlined />} onClick={handleCreateFold}>
          新建文件夹
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" danger disabled={!selected} onClick={handleDelWarning}>
          删除
        </Button>
        <Button icon={<SwapOutlined />} type="primary" ghost disabled={!selected} onClick={handleOpenMove}>
          移动
        </Button>
        <div className="search">
          <Space>
            <Input placeholder="请输入" style={{ width: 200 }} prefix={<SearchOutlined />} />
            <Button icon={<SortAscendingOutlined />} type="text" onClick={handleSort}></Button>
            <Button icon={menuMode ? <MenuOutlined /> : <ProductOutlined />} type="text" onClick={handleModeChange}></Button>
          </Space>
        </div>
      </div>
      <div className="paths">
        {currentPath?.map((item, index) => {
          return (
            <span className="path" key={index} onClick={() => handlePathChange(index)}>
              {item?.fileName}
            </span>
          )
        })}
      </div>
      <div className="Document">
        {files?.map((item, index) => {
          return <FileIter fileItem={item} key={index} handleSelect={handleSelect} handleUnSelect={handleUnSelect} handleSelectPath={(value: FileItem) => handleSelectPath(value)} selectedLists={selectedLists} />
        })}
      </div>
      {visible ? <CreareFold open={visible} handleClose={handleClose} handleOk={handleSubmit} /> : null}
      {moveVisible ? <MoveDialog open={moveVisible} handleClose={handleMoveClose} handleOk={handleMoveSubmit} /> : null}
    </div>
  )
}
