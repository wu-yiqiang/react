import SvgIcon from "@/components/SvgIcon/SvgIcon";
import './index.scss'
import PdfDocument from "./PdfDocument";
export default function DocumentManager() {
  return (
    <div className="Document">
      <PdfDocument />
      <PdfDocument />
    </div>
  )
}
