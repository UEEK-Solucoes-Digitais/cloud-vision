import { usePageSettings } from '@admin/contexts/usePageTitleContext'
import { useEffect } from 'react'

export default function SetPageSetting(pageIcon: string, pageTitle: string) {
    const { setPageSettings } = usePageSettings()

    useEffect(() => {
        setPageSettings({ pageIcon, pageTitle })
    }, [setPageSettings, pageIcon, pageTitle])
}
