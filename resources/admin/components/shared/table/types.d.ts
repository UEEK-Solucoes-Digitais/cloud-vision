import { ComponentProps, ReactNode } from 'react'

import { ReactSortableProps } from 'react-sortablejs'

export interface RootProps extends ComponentProps<'div'> {
    children?: ReactNode
}

export interface RowProps extends ComponentProps<'div'> {
    children?: ReactNode
    highlight?: boolean
    sortable?: boolean
}

export interface HeaderProps extends ComponentProps<'div'> {
    children?: ReactNode
}

export interface BodyProps extends ComponentProps<'div'> {
    children?: ReactNode
}

export interface BodySortableProps extends ReactSortableProps {
    children?: ReactNode
}

export interface CellProps extends ComponentProps<'div'> {
    children?: ReactNode
    overflowEllipsis?: boolean
}

export interface SearchProps extends ComponentProps<'div'> {
    onSubmit: (data: any) => void
}

export type SearchInputs = {
    search: string
}
