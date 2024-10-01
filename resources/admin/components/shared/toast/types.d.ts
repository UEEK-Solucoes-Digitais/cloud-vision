import { ComponentProps } from 'react'

type ToastTypes = 'alert' | 'attention' | 'success'

export interface ToastProps extends ComponentProps<'div'> {
    title?: string
    message?: string
    link?: string
    linkMessage?: string
    visible: boolean
    type: ToastTypes
}
