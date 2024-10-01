import { ReactNode } from 'react'
import { CommonProps } from '../globals'

export interface RootProps extends CommonProps {
    children?: ReactNode
    defaultValue?: string
}

export interface ListProps {
    children?: ReactNode
}

export interface ContentProps {
    children?: ReactNode
    value: any
}

export interface TriggerProps {
    children?: ReactNode
    value: any
}
