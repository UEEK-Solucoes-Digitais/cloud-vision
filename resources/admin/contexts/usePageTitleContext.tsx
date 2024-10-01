import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useState } from 'react'

interface PageSettingsContextProps {
    pageSettings: {
        pageIcon: string
        pageTitle: string
    }
    setPageSettings: Dispatch<SetStateAction<any>>
}

const PageSettingsContext = createContext<PageSettingsContextProps | undefined>(undefined)

interface PageSettingsProviderProps {
    children: ReactNode
}

export const usePageSettings = () => {
    const context = useContext(PageSettingsContext)
    if (!context) {
        throw new Error('usePageSettings deve ser usado dentro de um PageSettingsProvider')
    }
    return context
}

export const PageSettingsProvider = ({ children }: PageSettingsProviderProps) => {
    const [pageSettings, setPageSettings] = useState({
        pageIcon: '',
        pageTitle: '',
    })

    return (
        <PageSettingsContext.Provider value={{ pageSettings, setPageSettings }}>
            {children}
        </PageSettingsContext.Provider>
    )
}
