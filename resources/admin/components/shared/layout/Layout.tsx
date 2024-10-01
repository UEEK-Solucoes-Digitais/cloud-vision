import { type ReactNode, lazy } from 'react'

import Providers from '@admin/components/shared/providers/providers'

const Navbar = lazy(() => import('@admin/components/shared/navbar/Navbar'))

export function LayoutLogin({ children }: { children: ReactNode }) {
    return (
        <Providers>
            <main>{children}</main>
        </Providers>
    )
}

export function Layout({ children }: { children: ReactNode }) {
    return (
        <LayoutLogin>
            <Navbar>{children}</Navbar>
        </LayoutLogin>
    )
}
