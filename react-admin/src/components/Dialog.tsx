import { useEffect, useRef } from "react"

export default function Dialog(props: any) {
  const { open, slot } = props
  const dialog = useRef(null)
  const init = () => {
    dialog.current.showModal()
  }
  useEffect(() => {
    init()
  }, [])
  return <dialog ref={dialog} >{props.slot}</dialog>
}
