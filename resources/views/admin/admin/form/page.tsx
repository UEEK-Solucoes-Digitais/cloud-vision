import Button from '@admin/components/shared/button/Button'
import Flex from '@admin/components/shared/flex/Flex'
import Grid from '@admin/components/shared/grid/Grid'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import { Layout } from '@admin/components/shared/layout/Layout'
import SeoAplication from '@global/components/seo/SeoAplication'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
import IAdmin from '@global/types/models/Admin'
import BasicContentTypes from '@global/types/models/BasicContent'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { Icon } from '@iconify/react/dist/iconify.js'
import { router } from '@inertiajs/react'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './styles.module.scss'

interface IProps extends BasicContentTypes {
    admin: IAdmin
}

interface AdminInput extends IAdmin {
    confirmPassword: string
}

function Page({ admin, content }: IProps) {
    SetPageSetting('lucide:users', content.title)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { showToast } = useToast()

    const disabled = loading || success

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AdminInput>()

    const password = watch('password')

    const getPasswordValidationMessage = () => {
        const letrasUppercase = /[A-Z]/
        const letrasLowercase = /[a-z]/
        const numbers = /[0-9]/
        const specialChars = /(?=.*[!@#$%^&*()-_])/

        let message = ''

        if (password) {
            if (password.length < 6) {
                message += `<span class="${styles.passwordError}">No mínimo 6 caracteres<br></span>`
            } else {
                message += `<span class="${styles.passwordSuccess}">No mínimo 6 caracteres<br></span>`
            }
            message += `<span class="${
                specialChars.test(password) ? styles.passwordSuccess : styles.passwordError
            }">Pelo menos 1 caractere especial<br></span>`
            message += `<span class="${
                letrasUppercase.test(password) ? styles.passwordSuccess : styles.passwordError
            }">Pelo menos 1 letra maiúscula<br></span>`
            message += `<span class="${
                letrasLowercase.test(password) ? styles.passwordSuccess : styles.passwordError
            }">Pelo menos 1 letra minúscula<br></span>`
            message += `<span class="${
                numbers.test(password) ? styles.passwordSuccess : styles.passwordError
            }">Pelo menos 1 número<br></span>`
        }

        return { __html: message }
    }

    const isValidPassword = (passwordText: string | undefined) => {
        const letrasUppercase = /[A-Z]/
        const letrasLowercase = /[a-z]/
        const numbers = /[0-9]/
        const specialChars = /(?=.*[!@#$%^&*()-_])/

        if (passwordText) {
            if (passwordText.length < 6) {
                return false
            }
            if (!letrasUppercase.test(passwordText)) {
                return false
            }
            if (!letrasLowercase.test(passwordText)) {
                return false
            }
            if (!numbers.test(passwordText)) {
                return false
            }
            if (!specialChars.test(passwordText)) {
                return false
            }
        }

        return true
    }

    const submit: SubmitHandler<AdminInput> = async (data) => {
        if (disabled) return

        if (admin) data.id = admin.id

        if (!admin && !data.password) {
            setShowToast(showToast, {
                title: 'Erro.',
                message: 'A senha é obrigatória no cadastro.',
                type: 'alert',
            })
            return
        }

        if (data.password !== data.confirmPassword) {
            setShowToast(showToast, {
                title: 'Erro.',
                message: 'As senhas não conferem.',
                type: 'alert',
            })
            return
        }

        if (!isValidPassword(data.password)) {
            setShowToast(showToast, {
                title: 'Erro.',
                message: 'A senha não é válida.',
                type: 'alert',
            })
            return
        }

        const formData = new FormData()

        for (const [key, value] of Object.entries(data)) {
            const stringValue = typeof value === 'number' ? value.toString() : value
            formData.append(key, stringValue)
        }

        setLoading(true)
        try {
            const response = await api.post(route('admin.admins.submit'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                setSuccess(true)
                setShowToast(showToast, response.data)

                return setTimeout(() => {
                    router.visit(route('admin.admins.index'))
                }, 2000)
            }
        } catch (error: unknown) {
            GetCatchError({ showToast, error })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SeoAplication title={content.seoTitle} description={content.seoDescription} />

            <form onSubmit={handleSubmit(submit)}>
                <Flex align='center' gap={10}>
                    <Button type='link' href={route('admin.admins.index')} fitContent variant='noBackground'>
                        <Icon icon='lucide:chevron-left' />
                    </Button>
                    <Heading as='h2' align='start'>{`${admin ? 'Editar' : 'Adicionar'} administrador ${
                        admin ? `- ${admin.name}` : ''
                    }`}</Heading>
                </Flex>

                <Flex direction='column' gap={30}>
                    <Grid columns={2} gap={20} mt='5'>
                        <Input
                            defaultValue={admin?.name ?? ''}
                            required
                            placeholder='Digite aqui o nome do administrador'
                            label='Título'
                            type='text'
                            register={register}
                            name='name'
                            error={errors.name && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />
                        <Input
                            defaultValue={admin?.email ?? ''}
                            required={false}
                            placeholder='Digite aqui o e-mail do administrador'
                            label='E-mail'
                            type='email'
                            register={register}
                            name='email'
                            error={errors.email && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />
                    </Grid>

                    <Grid columns={2} gap={20}>
                        <Input
                            required={false}
                            placeholder='Digite aqui a senha do admin'
                            label='Senha'
                            type='password'
                            register={register}
                            name='password'
                            error={errors.password && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />
                        <Input
                            required={false}
                            placeholder='Repita a senha'
                            label='Confirme a senha'
                            type='password'
                            register={register}
                            name='confirmPassword'
                            readOnly={disabled}
                        />
                    </Grid>

                    {password?.length && password?.length > 0 ? (
                        <>
                            <Heading as='h3' align='start'>
                                Sua senha deve conter:
                            </Heading>
                            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                            <p dangerouslySetInnerHTML={getPasswordValidationMessage()} />
                        </>
                    ) : (
                        ''
                    )}

                    <Flex align='center' justify='start' gap={20}>
                        <Button type='submit' fitContent loading={loading} disabled={success}>
                            Enviar
                        </Button>

                        <Button
                            type='link'
                            href={route('admin.admins.index')}
                            fitContent
                            variant='secondary'
                            disabled={disabled}>
                            Cancelar
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </>
    )
}

Page.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default Page
