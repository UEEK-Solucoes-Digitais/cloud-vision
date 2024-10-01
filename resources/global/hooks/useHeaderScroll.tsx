import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { useEventListener } from './useEventListener'

const HeaderScrollContext = createContext(false)

export function HeaderScrollProvider({ children }: { children: ReactNode }) {
    const [scrolled, setScrolled] = useState(false)

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const scrollPos = window.scrollY
            setScrolled(scrollPos > 50)
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        handleScroll()
    }, [])

    useEventListener('scroll', handleScroll)

    return <HeaderScrollContext.Provider value={scrolled}>{children}</HeaderScrollContext.Provider>
}

export function useHeaderScroll() {
    return useContext(HeaderScrollContext)
}
