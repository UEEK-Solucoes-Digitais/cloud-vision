import React, { HTMLAttributes } from 'react'
import { ElementType, AlignType } from './types'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface TextProps extends HTMLAttributes<HTMLParagraphElement | HTMLLabelElement | HTMLSpanElement | HTMLDivElement> {
    as?: ElementType
    align?: AlignType
    dark?: boolean
    children?: React.ReactNode | string
}

const Text: React.FC<TextProps> = ({
    as: Component = 'span',
    align = 'start',
    className = false,
    dark = false,
    children,
    ...rest
}) => {
    const classes = clsx(styles.text, className, styles[`align-${align}`], dark && styles.dark)

    return (
        <Component {...rest} className={classes} data-element={Component}>
            {children}
        </Component>
    )
}

export default Text
