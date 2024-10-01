import { createContext, useState, useContext, ReactNode } from 'react'
import { useEventListener } from './useEventListener'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export interface IWindowSize {
    width: number
    height: number
}

const ScreenContext = createContext<IWindowSize | undefined>(undefined)

export function ScreenProvider({ children }: { children: ReactNode }) {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    useEventListener('resize', handleResize)
    useEventListener('orientationchange', handleResize)

    useIsomorphicLayoutEffect(() => {
        handleResize()
    }, [])

    return <ScreenContext.Provider value={windowSize}>{children}</ScreenContext.Provider>
}

export function useResize() {
    return useContext(ScreenContext)
}
