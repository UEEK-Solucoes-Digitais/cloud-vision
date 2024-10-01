export type LoginInputs = {
    email: string
    password: string
}

export type LoginProps = {
    callbackUrl?: string
}

export interface GeralFormProps {
    show: boolean
    setShow: (form: 1 | 2 | 3) => void
    className?: string
}

export type RecoveryInputs = {
    email: string
}

export type NewPasswordInputs = {
    password: string
    confirmPassword: string
}
