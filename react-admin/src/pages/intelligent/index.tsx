import { Input } from "antd"
//import useSystemStore from "@/store/index";
const { Search } = Input
import './index.scss'
import Chat from "./chat"
import { useState } from "react"

export default function Intelligent() {
  const [loading, setLoading] = useState(false)
  const [datas, setDatas] = useState([
    { type: 'question', msg: '你是谁' },
    { type: 'answer', msg: '我叫deepseek' },
    { type: 'question', msg: '今天天气' },
    { type: 'answer', msg: '今天是个大晴天' },
  ])
  const onSearch = async (value: string) => {
    if(!value) return
    setLoading(true)
    setDatas([...datas, { type: 'question', msg: value }])
    // const data = await fetch('https://locahost:8700/intelligent', {method: 'post', body: JSON.stringify(value),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).finally(() => {
    //   setLoading(false)
    //   })
    setDatas([...datas, { type: 'answer', msg: '11' }])
  }
  
  return (
    <section className="Intelligent">
      <div className="title-box">智能解答</div>
      <div className="contents">
        <Chat datas={datas} />
      </div>
      <div className="submit">
        <Search placeholder="input your question" allowClear enterButton="Search" onSearch={onSearch} loading={loading} />
      </div>
    </section>
  )
}
