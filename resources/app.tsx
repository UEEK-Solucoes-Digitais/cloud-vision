import { createInertiaApp } from '@inertiajs/react'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

function resolvePageComponent<T>(name: string, pages: Record<string, Promise<T> | (() => Promise<T>)>): Promise<T> {
    for (const path in pages) {
        if (path.endsWith(`${name.replace('.', '/')}.tsx`)) {
            const page = pages[path]
            if (typeof page === 'function') {
                return page()
            }

            return page
        }
    }

    throw new Error(`Page not found: ${name}`)
}

createInertiaApp({
    id: 'app',
    title: (title: string) => title,
    resolve: (name: string) => resolvePageComponent(name, import.meta.glob('./views/**/**/*.tsx', { eager: false })),
    setup({ el, App, props }) {
        const root = createRoot(el).render(
            <StrictMode>
                <Suspense >
                    <App {...props} />
                </Suspense>
            </StrictMode>,
        )

        delete el.dataset.page

        return root
    },
    progress: {
        delay: 250,
        includeCSS: true,
        showSpinner: false,
    },
})
