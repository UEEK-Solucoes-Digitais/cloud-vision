import type { ReactNode } from 'react'

import { ToastProvider } from '@admin/contexts/useToastContext'

import { PageSettingsProvider } from '@admin/contexts/usePageTitleContext'
import ErrorBoundary from '@global/components/error/error-boundary'
import ErrorFallback from '@global/components/error/error-fallback'
import Toast from '../toast/toast'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary
            fallbackComponent={<ErrorFallback error='Ocorreu um erro na aplicação' type='text-absolute-center' />}>
            <ToastProvider>
                <PageSettingsProvider>{children}</PageSettingsProvider>

                <Toast />
            </ToastProvider>
        </ErrorBoundary>
    )
}
