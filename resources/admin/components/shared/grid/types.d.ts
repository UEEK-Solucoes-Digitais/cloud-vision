import { CommonProps } from '../globals'
import { ComponentProps, ReactNode } from 'react'

export type ColumnsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export interface GridProps extends ComponentProps<'div'>, CommonProps {
    columns?: ColumnsType
    gap?: number
    children?: ReactNode
}
