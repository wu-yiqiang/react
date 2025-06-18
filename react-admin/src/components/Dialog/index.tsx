import { Children, useEffect, useRef } from "react"
import './index.scss'
export default function Dialog(props: any) {
  const { open, children } = props
  const dialog = useRef(null)
  const init = () => {
    // @ts-ignore
    open && dialog?.current?.showModal()
  }
  useEffect(() => {
    init()
  }, [])
  return <dialog ref={dialog} id="Dialog" >{children}</dialog>
}
