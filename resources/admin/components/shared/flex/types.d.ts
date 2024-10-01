import { ReactNode, ComponentProps } from 'react'
import { CommonProps } from '../globals'

export type AxisType = 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'space-between'
export type DirectionType = 'column' | 'row'
export interface FlexProps extends ComponentProps<'div'>, CommonProps {
    align?: AxisType
    justify?: AxisType
    direction?: DirectionType
    gap?: number
    children?: ReactNode
}
