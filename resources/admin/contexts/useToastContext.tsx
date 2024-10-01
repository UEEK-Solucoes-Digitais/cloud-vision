import type { ToastProps } from '@admin/components/shared/toast/types'
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ToastContextProps {
    showToast: (props: ToastProps) => void
    hideToast: (props: ToastProps) => void
    toastProps: ToastProps
    isVisible: boolean
}

interface ToastProviderProps {
    children: ReactNode
}

const ToastContext = createContext<ToastContextProps>({
    showToast: () => {},
    hideToast: () => {},
    toastProps: {
        title: '',
        message: '',
        visible: false,
        type: 'alert',
    },
    isVisible: false,
})

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider')
    }
    return context
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toastProps, setToastProps] = useState<ToastProps>({
        title: '',
        message: '',
        visible: false,
        type: 'alert',
    })
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const hideToast = useCallback(
        (props: ToastProps) => {
            setToastProps({ ...props, visible: false })

            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            setTimeout(() => {
                setIsVisible(false)
            }, 6000)
        },
        [timeoutId],
    )

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const showToast = useCallback(
        (props: ToastProps) => {
            hideToast(props)

            setToastProps({ ...props, visible: true })

            setTimeout(() => {
                setToastProps({ ...props, visible: true })
                setIsVisible(true)

                const newTimer = setTimeout(() => {
                    hideToast(props)
                }, 4000)

                setTimeoutId(newTimer)
            }, 100)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [timeoutId, hideToast],
    )

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [timeoutId])

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toastProps, isVisible }}>
            {children}
        </ToastContext.Provider>
    )
}
