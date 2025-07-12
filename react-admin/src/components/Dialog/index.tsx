import { Children, useEffect, useRef } from "react"
import './index.scss'
export default function Dialog(props: any) {
  const { open, children, handleClose } = props
  const dialog = useRef(null)
  const init = () => {
    // @ts-ignore
    if (open && dialog?.current) {
      dialog?.current?.showModal()
      dialog?.current?.addEventListener('keydown', (event: Event) => {
        if (event.key == 'Escape') {
          handleClose && handleClose()
        }
      })
    }
    
  }

  useEffect(() => {
    init()
  }, [open])
  return (
    <>
      {open ? <dialog ref={dialog}>{children}</dialog> : null}
    </>
  )
}
