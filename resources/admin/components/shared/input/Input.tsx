import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import clsx from 'clsx'
import type React from 'react'
import { type ChangeEvent, type HTMLAttributes, useEffect } from 'react'
import type { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { NumericFormat } from 'react-number-format'
import { generateCommonClasses } from '../commonStyles'
import type { CommonProps } from '../globals'
import Text from '../text/Text'
import { MyCustomUploadAdapterPlugin } from './ckeditor-helper'

import styles from './styles.module.scss'

interface InputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, CommonProps {
    register?: UseFormRegister<any>
    setValue?: UseFormSetValue<any>
    name?: string
    error?: string
    type?:
        | 'text'
        | 'password'
        | 'hidden'
        | 'textarea'
        | 'date'
        | 'datetime'
        | 'email'
        | 'color'
        | 'url'
        | 'datetime-local'
        | 'number'
    hidden?: boolean
    label?: Path<any>
    required: boolean
    placeholder?: string
    small?: boolean
    isEditor?: boolean
    maxLength?: number
    mask?: string
    readOnly?: boolean
    onEditorChange?: (value: string) => void
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    min?: number
    max?: number
    value?: any
    defaultValue?: any
}

const Input: React.FC<InputProps> = ({
    small = false,
    name,
    hidden = false,
    error,
    register,
    setValue,
    required,
    type,
    label,
    placeholder,
    className = false,
    isEditor = false,
    maxLength = 100,
    mask,
    onEditorChange,
    onChange,
    min,
    max,
    value,
    defaultValue,
    ...rest
}) => {
    const classes = clsx(
        styles.inputWrapper,
        error && styles.errorClass,
        small && styles.small,
        type === 'color' && styles.colorInput,
        (hidden || type === 'hidden') && styles.hidden,
        className,
        generateCommonClasses(rest),
    )

    let maskOptions: any = ''

    if (mask !== undefined) {
        switch (mask) {
            case 'phone':
                maskOptions = [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]
                break
            case 'cpf':
                maskOptions = '000.000.000-00'
                break
            case 'cnpj':
                maskOptions = '00.000.000/0000-00'
                break
            case 'cep':
                maskOptions = '00000-000'
                break
            case 'date':
                maskOptions = '00/00/0000'
                break
            case 'price':
                maskOptions = /^\d+(,\d{0,2})?$/
                break
            case 'creditCard':
                maskOptions = '0000 0000 0000 0000'
                break
            case 'expirationDate':
                maskOptions = '00/00'
                break
            case 'safetyCode':
                maskOptions = '000'
                break
        }
    }

    useEffect(() => {
        if (defaultValue && setValue && name) {
            setValue(name, defaultValue)
        }
    }, [defaultValue, setValue, name])

    return (
        <div className={classes}>
            {!hidden && type !== 'hidden' && label && (
                <label htmlFor={`${type}-${name}`}>{required ? `${label}*` : label}</label>
            )}

            {type === 'textarea' ? (
                isEditor ? (
                    <CKEditor
                        id={`${type}-${name}`}
                        editor={ClassicEditor}
                        config={{
                            extraPlugins: [MyCustomUploadAdapterPlugin as any],
                            toolbar: [
                                'heading',
                                'bold',
                                'italic',
                                '|',
                                'link',
                                'bulletedList',
                                'numberedList',
                                'insertImage',
                                '|',
                                'undo',
                                'redo',
                            ],
                            placeholder,
                        }}
                        onReady={(editor) => {
                            editor.setData(defaultValue as string)

                            register?.(name ?? '', { required })
                        }}
                        onChange={(_, editor) => {
                            const data = editor.getData()
                            if (setValue && name) {
                                setValue(name, data, { shouldValidate: false })
                            }
                            if (onEditorChange) {
                                onEditorChange(data)
                            }
                        }}
                    />
                ) : (
                    <textarea
                        hidden={hidden}
                        placeholder={placeholder}
                        id={`${type}-${name}`}
                        defaultValue={defaultValue}
                        {...register?.(name ?? '', { required })}
                        {...rest}
                    />
                )
            ) : mask !== undefined ? (
                <>
                    {typeof maskOptions !== 'undefined' && maskOptions !== '' && mask !== 'price' && (
                        <IMaskInput
                            name={name}
                            placeholder={placeholder}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (typeof setValue !== 'undefined' && setValue != null) {
                                    setValue(name ?? '', e.target.value)
                                }
                            }}
                            mask={maskOptions as any}
                            defaultValue={defaultValue ?? ''}
                            type={type}
                            maxLength={maxLength}
                        />
                    )}

                    {mask === 'price' && (
                        <NumericFormat
                            value={defaultValue as string | number | undefined}
                            fixedDecimalScale
                            decimalScale={2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (typeof setValue !== 'undefined' && setValue != null) {
                                    setValue(name ?? '', e.target.value)
                                }
                            }}
                            decimalSeparator=','
                            thousandSeparator='.'
                            name={name}
                            placeholder={placeholder}
                            maxLength={maxLength}
                        />
                    )}
                </>
            ) : (
                {
                    ...(register ? (
                        <input
                            hidden={hidden}
                            type={type}
                            placeholder={placeholder}
                            id={`${type}-${name}`}
                            maxLength={maxLength}
                            min={min}
                            max={max}
                            defaultValue={defaultValue}
                            {...register?.(name ?? '', {
                                required,
                                onChange: (e) => {
                                    if (onChange) {
                                        onChange(e)
                                    }
                                },
                            })}
                            {...rest}
                        />
                    ) : (
                        <input
                            hidden={hidden}
                            type={type}
                            placeholder={placeholder}
                            id={`${type}-${name}`}
                            maxLength={maxLength}
                            min={min}
                            max={max}
                            defaultValue={defaultValue}
                            onChange={onChange}
                            name={name}
                            {...rest}
                        />
                    )),
                }
            )}
            {!hidden && type !== 'hidden' && <Text className={styles.errorMessage}>{error ?? ' '}</Text>}
        </div>
    )
}

export default Input
