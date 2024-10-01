import { useEffect, useState } from 'react'

type SearchParamsHook = {
    params: URLSearchParams
    get: (name: string) => string | null
    set: (name: string, value: string) => void
    delete: (name: string) => void
}

export function useSearchParams(): SearchParamsHook {
    const [search, setSearch] = useState(window.location.search)
    const params = new URLSearchParams(search)

    useEffect(() => {
        const handlePopState = () => setSearch(window.location.search)
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const set = (name: string, value: string) => {
        params.set(name, value)
        updateSearch()
    }

    const get = (name: string): string | null => {
        return params.get(name)
    }

    const deleteParam = (name: string) => {
        params.delete(name)
        updateSearch()
    }

    const updateSearch = () => {
        const newSearch = params.toString()
        window.history.pushState({}, '', `${window.location.pathname}?${newSearch}`)
        setSearch(newSearch)
    }

    return { params, get, set, delete: deleteParam }
}
