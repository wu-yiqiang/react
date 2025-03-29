import "./SvgIcon.scss";
interface SvgIconProps {
  name: string; // svg名字
  size?: string; // 大小
  color?: string; // 填充颜色
}
export default function SvgIcon(props: SvgIconProps) {
  const { name, size, color } = props
  return (
    <svg
      className={`svg-icon icon-${name}`}
      style={{ color: color, fontSize: size }}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
}
