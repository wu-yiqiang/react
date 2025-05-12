import './question.scss'

export default function Question(props: any) {
  const { data } = props
  return (
    <section className="Question">
      <div className="msg">{data?.msg}</div>
    </section>
  )
}
