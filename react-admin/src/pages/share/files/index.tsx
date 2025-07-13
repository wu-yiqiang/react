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
import Authority from "@/components/Authority";
export default function DocumentManager() {
  const [menuMode, setMenuMode] = useState(true)
  const [selectedLists, setSelectedLists] = useState<any>([])
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState([
    {
      url: '',
      file_name: 'net_disk',
      file_size: 0,
      id: null,
      is_fold: true,
      parent_id: null,
    }
  ])
  const current_id = useMemo(() => {
    return currentPath[currentPath?.length - 1]?.id
  }, [currentPath])

  const handleSelect = (value: number) => {
    setSelectedLists([...selectedLists, value])
  }
  const handleUnSelect = (value: number) => {
    const data = selectedLists?.filter((i: number) => i != value)
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
  const handleSelectPath = (value: any) => {
    setCurrentPath([...currentPath, value])
  }
  const handlePathChange = (value: number) => {
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
        <Authority permission="share:file:upload">
          <FileUpload current_id={current_id} handleOk={getCurrentPathFiles} />
        </Authority>
        <Authority permission="share:fold:create">
          <CreateFold current_id={current_id} handleOk={getCurrentPathFiles} />
        </Authority>
        <Authority permission="share:file:delete">
          <DeleteFile selectedLists={selectedLists} handleOk={getCurrentPathFiles} />
        </Authority>
        <Authority permission="share:file:move">
          <MoveFile selectedLists={selectedLists} handleOk={getCurrentPathFiles} />
        </Authority>

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
      <div className="Files">
        {files?.map((item, index) => {
          return <FileIter fileItem={item} key={index} handleSelect={handleSelect} handleUnSelect={handleUnSelect} handleSelectPath={(value: FileItem) => handleSelectPath(value)} selectedLists={selectedLists} />
        })}
      </div>
    </div>
  )
}
