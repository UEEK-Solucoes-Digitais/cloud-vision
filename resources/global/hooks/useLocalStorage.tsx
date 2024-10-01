import { useState } from 'react'

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            return value ? JSON.parse(value) : defaultValue
        } catch (err) {
            console.error(err)
            return defaultValue
        }
    })

    const setValue = (newValue: T) => {
        try {
            const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue
            setStoredValue(valueToStore)
            window.localStorage.setItem(keyName, JSON.stringify(valueToStore))
        } catch (err) {
            console.error(err)
        }
    }

    return [storedValue, setValue] as const
}
