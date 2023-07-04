import style from './detail.module.less'
function Detail(props: any) {
  const { src, introduce } = props
  return (
    <div className={style.Detail}>
      详情
    </div>
  )
}

export default Detail
