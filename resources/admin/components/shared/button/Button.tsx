import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import type { FC, HTMLAttributes, ReactNode } from 'react'
import { generateCommonClasses } from '../commonStyles'
import type { CommonProps } from '../globals'
import styles from './styles.module.scss'

type ButtonVariants = 'primary' | 'secondary' | 'noBackground'
type ButtonTypes = 'submit' | 'button' | 'link'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, CommonProps {
    type?: ButtonTypes
    visual?: string
    loading?: boolean
    fitContent?: boolean
    children?: ReactNode
    variant?: ButtonVariants
    table?: boolean
    color?: string
    small?: boolean
    icon?: boolean
    hidden?: boolean
    href?: string
    target?: string
    disabled?: boolean
    dataFancybox?: string
    active?: boolean
}

const Button: FC<ButtonProps> = ({
    visual = '',
    href = '',
    hidden = false,
    small = false,
    icon = false,
    table = false,
    color,
    variant = 'primary',
    fitContent = false,
    loading = false,
    type,
    children,
    className = false,
    target = '_self',
    disabled,
    dataFancybox,
    active,
    ...rest
}) => {
    const classes = clsx(
        styles.geralButton,
        loading && styles.loading,
        disabled && styles.disabled,
        fitContent && styles.fitContent,
        variant && styles[variant],
        table && styles.table,
        small && styles.small,
        icon && styles.icon,
        hidden && styles.hidden,
        active && styles.active,
        color && styles[color],
        visual && styles[visual],
        className,
        generateCommonClasses(rest),
    )

    if (type === 'link') {
        return (
            <Link className={classes} href={href} target={target} data-fancybox={dataFancybox ?? ''}>
                {children}
            </Link>
        )
    }

    const disable = loading || disabled

    return (
        <button className={classes} type={type} {...rest} disabled={disable}>
            {children}
        </button>
    )
}

export default Button
