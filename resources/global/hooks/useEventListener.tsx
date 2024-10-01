import { useEffect, useRef } from 'react'

type EventHandler<T = Event> = (event: T) => void

export function useEventListener<T extends Event = Event>(
    eventName: string,
    handler: EventHandler<T>,
    element?: Window | HTMLElement,
) {
    const savedHandler = useRef<EventHandler<T>>()

    if (!element && typeof window !== 'undefined') {
        element = window
    }

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const isSupported = element?.addEventListener
        if (!isSupported) {
            return
        }

        const eventListener: EventHandler<T> = (event) => savedHandler?.current?.(event)
        element?.addEventListener(eventName, eventListener as unknown as (evt: Event) => void)

        return () => {
            element?.removeEventListener(eventName, eventListener as unknown as (evt: Event) => void)
        }
    }, [eventName, element])
}
