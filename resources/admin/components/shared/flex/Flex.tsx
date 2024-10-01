import React from 'react'
import { FlexProps } from './types'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { generateCommonClasses } from '../commonStyles'

const Flex: React.FC<FlexProps> = ({ className = false, align, justify, direction, children, gap, ...rest }) => {
    const classes = clsx(
        styles.flexContainer,
        className,
        align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        direction && styles[direction],
        generateCommonClasses(rest),
    )

    return (
        <div className={classes} {...rest} style={{ gap: !gap ? '12px' : `${gap}px` }}>
            {children}
        </div>
    )
}

export default Flex
