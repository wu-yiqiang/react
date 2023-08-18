import style from './color.module.less'
function Color(props: any) {
  const { color, selected } = props
  return <div style={{ backgroundColor: color }} className={selected ? `${style.Color} ${style.active}` : `${style.Color}`} data-color={ color }></div>
}

export default Color;
