import { Children, useEffect, useRef } from "react"
import './index.scss'
export default function Dialog(props: any) {
  const { open, children, handleClose } = props
  const dialog = useRef(null)
  const init = () => {
    if (open && dialog?.current) {
      // @ts-ignore
      dialog?.current?.showModal()
      // @ts-ignore
      dialog?.current?.addEventListener('keydown', (event: Event) => {
        // @ts-ignore
        if (event?.key == 'Escape') {
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
