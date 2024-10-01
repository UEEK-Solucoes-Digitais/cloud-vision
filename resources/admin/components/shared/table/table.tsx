import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { BodyProps, CellProps, HeaderProps, RootProps, RowProps, SearchInputs, SearchProps } from './types'
import Flex from '../flex/Flex'
import Input from '../input/Input'
import Button from '../button/Button'
import { useForm } from 'react-hook-form'

export const TableRoot: React.FC<RootProps> = ({ children }) => {
    const classes = clsx(styles.tableRoot)

    return <div className={classes}>{children}</div>
}

export const TableRow: React.FC<RowProps> = ({ children, highlight = false, sortable = false }) => {
    const classes = clsx(styles.tableRow, highlight && styles.highlight, sortable && styles.sortable)

    return (
        <div className={classes} style={{ gridTemplateColumns: `repeat(${React.Children.count(children)}, 1fr)` }}>
            {sortable && <div className='drag-row'>☰</div>}
            {children}
        </div>
    )
}

export const TableHeader: React.FC<HeaderProps> = ({ children }) => {
    const classes = clsx(styles.tableHeader)

    return <div className={classes}>{children}</div>
}

export const TableBody: React.FC<BodyProps> = ({ children }) => {
    const classes = clsx(styles.tableBody)

    return <div className={classes}>{children}</div>
}

export const TableCell: React.FC<CellProps> = ({ children, overflowEllipsis }) => {
    const classes = clsx(styles.tableCell, overflowEllipsis && styles.overflowEllipsis)

    return <div className={classes}>{children}</div>
}

export const TableSearch: React.FC<SearchProps> = ({ onSubmit }) => {
    const classes = clsx(styles.tableSearch)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchInputs>()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            <Flex align='center' gap={12}>
                <Input
                    small
                    required
                    placeholder='Procurar'
                    type='text'
                    register={register}
                    name='search'
                    error={errors.search && 'É necessário preencher o campo para pesquisar'}
                />
                <Button variant='secondary' small fitContent>
                    Filtrar
                </Button>
            </Flex>
        </form>
    )
}

export const Table = {
    Root: TableRoot,
    Row: TableRow,
    Header: TableHeader,
    Body: TableBody,
    Cell: TableCell,
    Search: TableSearch,
}
