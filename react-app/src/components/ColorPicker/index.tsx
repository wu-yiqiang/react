import style from './index.module.less'
import Color from '@/components/ColorPicker/color'
function ColorPicker(props: any) {
  const { colors, handleColors, selected } = props
  return (
    <div className={style.ColorPicker} onClick={(e) => handleColors(e)}>
      {colors.map((v: boolean, index: Number) => {
        return <Color className={style.colorsBox} selected={selected === index ? true : false} key={index} color={v} value={v} />
      })}
    </div>
  )
}

export default ColorPicker
