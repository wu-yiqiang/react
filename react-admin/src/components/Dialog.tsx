import { useEffect, useRef } from "react"

export default function Dialog(props: any) {
  const { open, slot } = props
  console.log("sds", props)
  const dialog = useRef(null)
  const init = () => {
    console.log('sdsd', dialog)
    dialog.current.showModal()
  }
  useEffect(() => {
    init()
  }, [])
  return <dialog ref={dialog} >{props.slot}</dialog>
}
