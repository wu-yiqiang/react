import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileIter from './FileIter'
import { Button, Upload, Input, Checkbox, Row, Col, Space, Breadcrumb } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined, MenuOutlined, SortAscendingOutlined, ProductOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from "react";
import CreareFold from './create-fold-dialog'
import { FileItem } from '@/types/file'
import {getFiles} from '@/api/share'
export default function DocumentManager() {
  const [visible, setVivible] = useState(false)
  const [menuMode, setMenuMode] = useState(true)
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
        <Button icon={<DeleteOutlined />} type="primary" danger disabled={!selected}>
          删除
        </Button>
        <Button icon={<SwapOutlined />} type="primary" ghost disabled={!selected}>
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
          return <FileIter fileItem={item} key={index} handleSelect={handleSelect} handleUnSelect={handleUnSelect} handleSelectPath={(value: FileItem) => handleSelectPath(value)} />
        })}
      </div>
      {visible ? <CreareFold open={visible} handleClose={handleClose} handleOk={handleSubmit} selectedLists={selectedLists} /> : null}
    </div>
  )
}
