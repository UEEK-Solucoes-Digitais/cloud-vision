import { ReactNode } from 'react'

// import Header from '../header/Header'
// import Footer from '../footer/Footer'
import ErrorBoundary from '@global/components/error/error-boundary'
import { Bounce, ToastContainer } from 'react-toastify'

export function Layout({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary>
            <div className='flex flex-col min-h-screen'>
                <div className='flex-grow '>
                    {/* <Header /> */}
                    <main>
                        {children}
                        <ToastContainer
                            position='top-right'
                            autoClose={3000}
                            limit={5}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                            theme='light'
                            transition={Bounce}
                        />
                    </main>
                </div>
                {/* <Footer /> */}
            </div>
        </ErrorBoundary>
    )
}
export function LayoutLogin({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary>
            <main>{children}</main>
        </ErrorBoundary>
    )
}
