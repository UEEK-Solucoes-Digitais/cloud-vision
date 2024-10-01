import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryState {
    hasError: boolean
}

interface ErrorBoundaryProps {
    children: ReactNode
    fallbackComponent?: ReactNode
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.group('Error Boundary:')
        console.error('Message:', error)
        console.error('Info:', errorInfo)
        console.groupEnd()
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackComponent || <h1>Ocorreu um problema.</h1>
        }

        return this.props.children
    }
}
