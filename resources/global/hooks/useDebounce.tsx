import { useCallback, useRef } from 'react'

const useDebounce = <F extends (...args: unknown[]) => void>(func: F, delay: number) => {
    const timerId = useRef<number | null>(null)

    const debouncedFunc = useCallback(
        (...args: Parameters<F>) => {
            if (timerId.current !== null) {
                clearTimeout(timerId.current)
            }
            timerId.current = setTimeout(() => func(...args), delay) as unknown as number
        },
        [func, delay],
    )

    return debouncedFunc
}

export default useDebounce
