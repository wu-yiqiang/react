import style from './item.module.less'
function Item(props: any) {
  const { src, introduce } = props
  return (
    <div className={style.Item}>
      <img src={src} />
      <div className={style.introduce}>{introduce}</div>
    </div>
  )
}

export default Item
