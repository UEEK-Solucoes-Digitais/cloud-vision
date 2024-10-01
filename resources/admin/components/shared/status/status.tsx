import { FC } from 'react'
import clsx from 'clsx'
import { StatusProps } from './types'
import styles from './styles.module.scss'

const Status: FC<StatusProps> = ({ children, color }) => {
    const classes = clsx(styles.statusStyle, color && styles[color])

    return <div className={classes}>{children}</div>
}

export default Status
