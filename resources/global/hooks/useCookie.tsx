import { useState } from 'react'

const getCookieValue = (name: string) => {
    const matches = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)
    return matches ? decodeURIComponent(matches[2]) : null
}

export const useCookie = <T,>(keyName: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const cookieValue = getCookieValue(keyName)
            return cookieValue ? JSON.parse(cookieValue) : defaultValue
        } catch (err) {
            console.error(err)
            return defaultValue
        }
    })

    const setValue = (newValue: T, options?: { expires?: number; path?: string }) => {
        try {
            const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue
            setStoredValue(valueToStore)

            let cookieString = `${keyName}=${encodeURIComponent(JSON.stringify(valueToStore))};`

            if (options?.expires) {
                const date = new Date()
                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000)
                cookieString += `expires=${date.toUTCString()};`
            }

            if (options?.path) {
                cookieString += `path=${options.path};`
            }

            document.cookie = cookieString
        } catch (err) {
            console.error(err)
        }
    }

    const deleteCookie = () => {
        document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
    }

    return [storedValue, setValue, deleteCookie] as const
}
