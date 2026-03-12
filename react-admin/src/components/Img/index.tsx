import { Image } from 'antd'
import { useMemo } from 'react'
import './index.scss'
export default function Img(props: any) {
    const { fileName, previewOpen } = props
    const imageSrc = useMemo(() => {
        return import.meta.env.VITE_STORAGE_BASE_URL + fileName
    }, [fileName])
    return <>
        <Image preview={{
            open: previewOpen,
            // onOpenChange: (visible) => setPreviewOpen(visible),
            // afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }} style={{ width: '100px', height: '100px', objectFit: 'cover', objectPosition: 'top', borderRadius: '2px' }} src={imageSrc} />
    </>
}
