import { ComponentProps, FC, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { CommonProps } from '../globals'
import { generateCommonClasses } from '../commonStyles'

interface BoxProps extends ComponentProps<'div'>, CommonProps {
    children?: ReactNode
}

const Box: FC<BoxProps> = ({ children, className = false, ...rest }) => {
    const classes = clsx(styles.boxContainer, className, generateCommonClasses(rest))

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    )
}

export default Box
