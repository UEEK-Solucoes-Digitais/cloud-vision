import { useState, useEffect, useRef } from 'react'

interface MyIntersectionObserverInit {
    root?: Element | null
    rootMargin?: string
    threshold?: number | number[]
}

export default function useIntersectionObserver(options: MyIntersectionObserverInit) {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLElement | undefined>(undefined)

    useEffect(() => {
        const currentElement = elementRef.current
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            setIsVisible(entry.isIntersecting)
        }, options)

        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [options])

    return [elementRef, isVisible]
}
