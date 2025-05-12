
import Answer from "./answer"
import Question from "./question"
import './chat.scss'
export default function Chat(props: any) {
  const { datas } = props
  console.log('sds', datas)
  return (
    <section className="Chat">
      {datas?.map((item: any, index: number) => {
        return item.type == 'answer' ? <Answer data={item} key={index} /> : <Question data={item} key={index} />
      })}
    </section>
  )
}
