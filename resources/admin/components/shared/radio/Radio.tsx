import clsx from 'clsx'
import type React from 'react'
import { useEffect, useState, type ChangeEvent, type HTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { generateCommonClasses } from '../commonStyles'
import type { CommonProps } from '../globals'
import styles from './styles.module.scss'

interface GroupProps extends HTMLAttributes<HTMLDivElement>, CommonProps {
    children?: React.ReactNode
    label: string
}
export const Group: React.FC<GroupProps> = ({ children, label, ...rest }) => {
    const classes = clsx(styles.radioGroup, generateCommonClasses(rest))

    return (
        <div className={classes}>
            <label>{label}</label>
            <div className={styles.radioFlex}>{children}</div>
        </div>
    )
}

interface RadioProps extends HTMLAttributes<HTMLInputElement>, CommonProps {
    register: UseFormRegister<any>
    name: string
    error?: string
    required: boolean
    label: string
    defaultValue: number
    defaultChecked?: boolean // Mudança aqui para usar `defaultChecked`
}

export const Input: React.FC<RadioProps> = ({
    label,
    name,
    error,
    register,
    required,
    defaultValue,
    defaultChecked,
    className = '',
    ...rest
}) => {
    const [checked, setChecked] = useState(defaultChecked)

    const { ref, onChange, ...registration } = register(name, { required })

    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])

    const classes = clsx(styles.radioWrapper, error && styles.errorClass, className, generateCommonClasses(rest))

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        onChange(e)
    }

    return (
        <div className={classes}>
            <label>
                <input
                    hidden
                    type='radio'
                    ref={ref}
                    value={defaultValue}
                    checked={checked}
                    onChange={handleOnChange}
                    {...registration}
                />
                <div className={styles.boxOuter}>
                    <div className={styles.boxInner} />
                </div>
                <span className={styles.radioLabel}>{label}</span>
            </label>
        </div>
    )
}

export const Radio = {
    Group,
    Input,
}
