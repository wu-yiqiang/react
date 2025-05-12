import { Input } from 'antd'
import './answer.scss'

export default function Answer(props: any) {
  const {data} = props
  return <section className="Answer">{data?.msg}</section>
}
