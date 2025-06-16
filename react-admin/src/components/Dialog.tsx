import { useEffect, useRef } from "react"

export default function Dialog(props: any) {
  const { open, slot } = props
  const dialog = useRef(null)
  const init = () => {
    // @ts-ignore
    open && dialog?.current?.showModal()
  }
  useEffect(() => {
    init()
  }, [])
  return <dialog ref={dialog} id="Dialog" >{slot}</dialog>
}
