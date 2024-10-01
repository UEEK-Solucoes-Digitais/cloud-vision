import React, { HTMLAttributes } from 'react'
import { ElementType, AlignType } from './types'
import styles from './styles.module.scss'
import clsx from 'clsx'
import Button from '../button/Button'
import Fancybox from '../fancybox/fancybox'
import { DynamicIcon } from '@/components/shared/dynamic-icon/DynamicIcon'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType
    align: AlignType
    children?: React.ReactNode | string
    pathImage?: string
}

const Heading: React.FC<HeadingProps> = ({
    as: Component = 'h1',
    align = 'start',
    className = false,
    pathImage = '',
    children,
    ...rest
}) => {
    const classes = clsx(styles.heading, className, styles[`align-${align}`], pathImage && styles.withImage)

    return (
        <Component {...rest} className={classes} data-element={Component}>
            {children}

            {pathImage && (
                <Fancybox>
                    <Button
                        icon
                        type='link'
                        href={`/assets/images/content-adm/${pathImage}`}
                        dataFancybox='help-section'>
                        <DynamicIcon iconName='MessageQuestion' />
                    </Button>
                </Fancybox>
            )}
        </Component>
    )
}

export default Heading
