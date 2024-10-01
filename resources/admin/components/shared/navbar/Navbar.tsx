import { type ReactNode, lazy } from 'react'

import ErrorBoundary from '@global/components/error/error-boundary'

import usePath from '@global/hooks/usePath'
import styles from './styles.module.scss'

const Header = lazy(() => import('./components/Header'))
const Sidebar = lazy(() => import('./components/Sidebar'))

interface NavProps {
    children?: ReactNode
}

export default function Navbar({ children }: NavProps) {
    const { location } = usePath()

    return (
        <>
            <Sidebar />
            <Header />

            <div className={styles.navChildrenWrapper}>
                <ErrorBoundary key={location} fallbackComponent={<h1>Erro ao carregar conteúdo</h1>}>
                    {children}
                </ErrorBoundary>
            </div>
        </>
    )
}
