import type { ToastTypes } from '@admin/components/shared/toast/types'

interface DataProps {
    title: string
    message: string
    type: ToastTypes
}

export default function setShowToast(showToast: any, data: DataProps) {
    const { title, message, type } = data

    showToast({
        title,
        message,
        type,
        visible: true,
    })
}
