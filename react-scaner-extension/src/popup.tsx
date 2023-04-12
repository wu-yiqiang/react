import { FileOutlined, InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { Alert, Button, Checkbox, Input, Tabs, Upload, message } from "antd"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { QiniuConfig, qiniuUpload } from "./api/qiniu"
import { copyTextToClipboard } from "./utils/copy"

import "antd/dist/reset.css"
import "./styles/index.css"

const { Dragger } = Upload

let imageRegex = /data:image\/|\.(gif|jpe?g|tiff|png)$/i
function FileItem({ fileName, md }: { fileName: string; md: boolean }) {
  if (!fileName) {
    return null
  }
  if (fileName.match(imageRegex)) {
    return (
      <div
        onClick={() =>
          copyTextToClipboard(md ? `![](${fileName} "图片alt")` : fileName)
        }
        className="file-item">
        <img src={fileName} style={{ width: "100%" }} />
      </div>
    )
  } else {
    return (
      <div className="file-item">
        <div onClick={() => copyTextToClipboard(fileName)}>
          <FileOutlined />{" "}
          <span style={{ wordBreak: "break-all" }}>{fileName}</span>
        </div>
      </div>
    )
  }
}

function IndexPopup() {
  const [md, setMd] = useStorage("copyMd")
  const [fileName, setFileName] = useStorage("fileName")
  const [imgList, setimgList] = useStorage("fileList", [])
  const [qiniuConfig, setQiniuConfig] = useStorage<Partial<QiniuConfig>>(
    "qiniuConfig",
    {}
  )

  useEffect(() => {
    document.onpaste = (event) => {
      const items = event.clipboardData.items

      for (const item of items) {
        if (item.kind === "file") {
          var blob = item.getAsFile()
          qiniuUpload(blob, qiniuConfig as QiniuConfig).then((res: string) => {
            console.log(res)
            copyTextToClipboard(md ? `[](${res} "图片alt")` : res)
            setimgList((prev) => [res, ...prev])
            message.success("上传成功，已复制")
            setFileName(res)
          })
        }
      }
    }
  }, [qiniuConfig, md])

  const props: UploadProps = {
    name: "file",
    multiple: true,
    customRequest({ file, data, onSuccess, onError }) {
      qiniuUpload(file, qiniuConfig as QiniuConfig)
        .then((res: string) => {
          copyTextToClipboard(md ? `[](${res} "")` : res)
          setimgList((prev) => [res, ...prev])
          message.success("上传成功，已复制")
          setFileName(res)
          onSuccess(res)
        })
        .catch(onError)
    }
  }

  return (
    <div
      style={{
        width: 220,
        padding: "0 8px 8px"
      }}>
      <Tabs animated={false} defaultActiveKey="1" type="line">
        <Tabs.TabPane tab="上传" key="1">
          {qiniuConfig.accessKey ? (
            <div>
              <div className="input-wapper">
                <Input placeholder="^/⌘ + v 剪贴板上传" />
                <Checkbox onChange={(e) => setMd(e.target.checked)}>
                  markdown
                </Checkbox>
              </div>

              <Dragger className="mb-2" {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此处</p>
                <p className="ant-upload-hint">支持多文件上传</p>
              </Dragger>
            </div>
          ) : (
            <div className="mb-2">
              <Alert
                showIcon
                message="请先填写配置"
                description={
                  <a target="_blank" href="/options.html">
                    去设置
                  </a>
                }
                type="success"
              />
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane style={{height:250,overflow:'auto'}} tab="历史记录" key="2">
          {imgList.length > 0 && (
            <div className="mb-2 text-right">
              <Button
                size="small"
                onClick={() => setimgList([])}
                type="primary"
                danger>
                清除记录
              </Button>
            </div>
          )}
          {imgList?.map((fileName) => (
            <FileItem md={md} fileName={fileName} key={fileName} />
          ))}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
export default IndexPopup
