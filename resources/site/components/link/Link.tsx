import { FC, ReactNode } from 'react'

import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react'

import styles from './styles.module.scss'

interface props extends InertiaLinkProps {
    text: string
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean
    className?: string
    active?: boolean
}

export const Link: FC<props> = ({ children = null, onClick, disabled = false, href = '', text, active = false }) => {
    return (
        <InertiaLink
            href={href}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.Link} ${active ? styles.Active : ''}`}
            title={text}
            preserveScroll
            preserveState>
            {children}
            {text}
        </InertiaLink>
    )
}
