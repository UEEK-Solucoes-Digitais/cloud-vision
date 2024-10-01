import { ComponentProps, ReactNode } from 'react'

export interface StatusProps extends ComponentProps<'div'> {
    color?: string
    children: ReactNode
}
