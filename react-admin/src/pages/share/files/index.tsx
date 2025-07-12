import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import FileIter from './FileIter'
import FileUpload from "./FileUpload";
import { Button, Upload, Input, Modal, Row, Col, Space, Breadcrumb, Flex } from 'antd'
import { FolderAddOutlined, UploadOutlined, DeleteOutlined, SwapOutlined, SearchOutlined, MenuOutlined, SortAscendingOutlined, ProductOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from "react";
import MoveDialog from './MoveDialog'
import { FileItem } from '@/types/file'
import {deleteFiles, getFiles} from '@/api/share'
import Toast from "@/components/Toast";
import DeleteFile from "./DeleteFile";
import CreateFold from './CreateFold'
import MoveFile from "./MoveFile";
export default function DocumentManager() {
  const [menuMode, setMenuMode] = useState(true)
  const [currentPath, setCurrentPath] = useState([
    {
      file_name: 'net_disk',
      id: null
    }
  ])
  const current_id = useMemo(() => {
    return currentPath[currentPath?.length - 1]?.id
  }, [currentPath])
  const [selectedLists, setSelectedLists] = useState([])
  const [files, setFiles] = useState([])
  const handleSelect = (value: number) => {
    setSelectedLists([...selectedLists, value])
  }
  const handleUnSelect = (value: number) => {
    const data = selectedLists?.filter(i => i != value)
    setSelectedLists(data)
  }
  const handleModeChange = () => {
    setMenuMode(!menuMode)
  }
  const getCurrentPathFiles = async () => {
    setSelectedLists([])
    const { data } = await getFiles(current_id)
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
        <FileUpload current_id={current_id} handleOk={getCurrentPathFiles} />
        <CreateFold current_id={current_id} handleOk={getCurrentPathFiles} />
        <DeleteFile selectedLists={selectedLists} handleOk={getCurrentPathFiles} />
        <MoveFile selectedLists={selectedLists} handleOk={getCurrentPathFiles} />
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
              {item['file_name']}
            </span>
          )
        })}
      </div>
      <div className="Document">
        {files?.map((item, index) => {
          return <FileIter fileItem={item} key={item?.id} handleSelect={handleSelect} handleUnSelect={handleUnSelect} handleSelectPath={(value: FileItem) => handleSelectPath(value)} selectedLists={selectedLists} />
        })}
      </div>
    </div>
  )
}
