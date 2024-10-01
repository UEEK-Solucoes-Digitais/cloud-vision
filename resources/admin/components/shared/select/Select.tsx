import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'
import React, { type HTMLAttributes, useEffect } from 'react'
import type { Path, UseFormRegister } from 'react-hook-form'
import { generateCommonClasses } from '../commonStyles'
import type { CommonProps } from '../globals'
import IconifyIcon from '../iconify/IconifyIcon'
import Text from '../text/Text'
import styles from './styles.module.scss'

interface SelectProps extends HTMLAttributes<HTMLSelectElement | HTMLTextAreaElement>, CommonProps {
    register: UseFormRegister<any>
    name: string
    error?: string
    hidden?: boolean
    label?: Path<any>
    required: boolean
    placeholder?: string
    small?: boolean
    options?: { value: string; label: string }[]
    onChangeInput: (value: string) => void
}

const Select: React.FC<SelectProps> = ({
    small = false,
    name,
    hidden = false,
    error,
    register,
    required,
    label,
    placeholder = 'Selecione',
    className = false,
    options = [],
    onChangeInput,
    ...rest
}) => {
    const classes = clsx(
        styles.inputWrapper,
        error && styles.errorClass,
        small && styles.small,
        hidden && styles.hidden,
        className,
        generateCommonClasses(rest),
    )

    const [value, setValue] = React.useState(rest.defaultValue ? rest.defaultValue.toString() : undefined)

    useEffect(() => {
        if (value !== '' && value !== undefined) {
            onChangeInput(value.toString())
        }
    }, [value])

    return (
        <div className={classes}>
            {!hidden && label && <label htmlFor={`${name}`}>{required ? `${label}*` : label}</label>}

            {/* <select {...register(name, { required })} id={`${name}`} {...rest}>
                {placeholder && <option value=''>{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}

            <SelectRadix.Root
                // {...register(name, { required })}
                name={name}
                value={value}
                defaultValue={rest.defaultValue ? rest.defaultValue.toString() : undefined}
                required={required}
                // open={true}
                onValueChange={(set: string) => {
                    if (set) {
                        setValue(set)
                    }
                }}>
                <SelectRadix.Trigger className={styles.selectTrigger}>
                    <SelectRadix.Value placeholder={placeholder} />
                    <SelectRadix.Icon>
                        <IconifyIcon icon='lucide:chevron-down' />
                    </SelectRadix.Icon>
                </SelectRadix.Trigger>
                <SelectRadix.Portal>
                    <SelectRadix.Content className={styles.contentSelect} position='popper'>
                        <SelectRadix.Viewport>
                            {options.map((option) => (
                                <SelectRadix.Item
                                    key={option.value}
                                    value={option.value}
                                    className={styles.selectOption}>
                                    <SelectRadix.ItemText>{option.label}</SelectRadix.ItemText>
                                </SelectRadix.Item>
                            ))}
                        </SelectRadix.Viewport>
                    </SelectRadix.Content>
                </SelectRadix.Portal>
            </SelectRadix.Root>

            {!hidden && <Text className={styles.errorMessage}>{error ?? ' '}</Text>}
        </div>
    )
}

export default Select
