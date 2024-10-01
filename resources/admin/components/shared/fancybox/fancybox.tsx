import { useEffect, useRef, type CSSProperties, type PropsWithChildren } from 'react'

import { Fancybox as NativeFancybox } from '@fancyapps/ui'

import '@fancyapps/ui/dist/fancybox/fancybox.css'

import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options'

interface IProps {
    delegate?: string
    options?: Partial<OptionsType>
    style?: CSSProperties
    className?: string
}

export default function Fancybox(props: PropsWithChildren<IProps>) {
    const containerRef = useRef<HTMLDivElement>(null)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const container = containerRef.current

        if (container) {
            const delegate = props.delegate || '[data-fancybox]'
            const options = props.options || {
                Thumbs: {
                    type: 'modern',
                    // minCount: 1,
                },
                Toolbar: {
                    display: {
                        left: ['infobar'],
                        middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW', 'flipX', 'flipY'],
                        right: ['thumbs', 'close'],
                    },
                },
            }

            NativeFancybox.bind(container, delegate, options)

            return () => {
                NativeFancybox.unbind(container)
                NativeFancybox.close()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div ref={containerRef} className={props.className} style={props.style} {...props}>
            {props.children}
        </div>
    )
}
