import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { generateCommonClasses } from '../commonStyles'
import { GridProps } from './types'

const Grid: React.FC<GridProps> = ({ className = false, columns, children, gap, ...rest }) => {
    const classes = clsx(
        styles.gridContainer,
        className,
        columns && styles[`columns-${columns}`],
        generateCommonClasses(rest),
    )

    return (
        <div className={classes} {...rest} style={{ gap: !gap ? '12px' : `${gap}px` }}>
            {children}
        </div>
    )
}

export default Grid
