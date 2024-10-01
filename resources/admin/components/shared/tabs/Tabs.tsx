import * as RTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'
import { ContentProps, ListProps, RootProps, TriggerProps } from './types'
import { generateCommonClasses } from '../commonStyles'

export const Root: React.FC<RootProps> = ({ children, defaultValue, ...rest }) => {
    const classes = clsx(styles.Root, generateCommonClasses(rest))

    return (
        <RTabs.Root className={classes} defaultValue={defaultValue}>
            {children}
        </RTabs.Root>
    )
}

export const List: React.FC<ListProps> = ({ children }) => {
    const classes = clsx(styles.List)

    return <RTabs.List className={classes}>{children}</RTabs.List>
}

export const Content: React.FC<ContentProps> = ({ value, children }) => {
    const classes = clsx(styles.Content)

    return (
        <RTabs.Content value={value} className={classes}>
            {children}
        </RTabs.Content>
    )
}

export const Trigger: React.FC<TriggerProps> = ({ value, children }) => {
    const classes = clsx(styles.Trigger)

    return (
        <RTabs.Trigger value={value} className={classes}>
            {children}
        </RTabs.Trigger>
    )
}

export const Tabs = {
    Root,
    Trigger,
    List,
    Content,
}
