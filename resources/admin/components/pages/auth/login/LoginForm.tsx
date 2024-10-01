import type { GeralFormProps, LoginInputs } from '@admin/components/pages/auth/types'
import Button from '@admin/components/shared/button/Button'
import Flex from '@admin/components/shared/flex/Flex'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import Text from '@admin/components/shared/text/Text'
import { useToast } from '@admin/contexts/useToastContext'
import setShowToast from '@admin/utils/setShowToast'
import { api } from '@global/services/api'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import styles from './styles.module.scss'

export default function LoginForm({ show, setShow, className }: GeralFormProps) {
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>()

    const sendRecovery: SubmitHandler<LoginInputs> = async (data) => {
        if (loading) return

        setLoading(true)

        try {
            const response = await api.post(route('admin.sendLogin'), {
                ...data,
            })

            if (response.status === 200) {
                showToast({
                    title: 'Sucesso',
                    message: 'Autenticação realizada com sucesso, aguarde para ser redirecionado.',
                    type: 'success',
                    visible: true,
                })

                return setTimeout(() => {
                    router.visit(route('admin.dashboard'))
                }, 2000)
            }

            showToast({
                title: 'Ocorreu um erro',
                message: 'As credenciais estão incorretas, cheque os campos e tente novamente.',
                type: 'alert',
                visible: true,
            })
        } catch (error) {
            console.error(error)

            setShowToast(showToast, {
                title: 'Erro.',
                message: 'Falha ao realizar autenticação.',
                type: 'alert',
            })
        } finally {
            setLoading(false)
        }
    }

    if (!show) {
        return null
    }

    return (
        <form onSubmit={handleSubmit(sendRecovery)} className={className}>
            <Flex direction='column' align='center' justify='center' gap={40}>
                <Flex direction='column' align='start' gap={10}>
                    <Heading as='h1' align='start'>
                        Entrar na minha conta
                    </Heading>

                    <Text as='p' align='start'>
                        Preencha os campos abaixo para acessar o sistema
                    </Text>
                </Flex>

                <Flex direction='column' align='center' gap={20} mt='2'>
                    <Input
                        required
                        name='email'
                        type='text'
                        label='Email'
                        placeholder='Digite seu email'
                        register={register}
                        error={errors.email && 'Este campo é obrigatório'}
                        readOnly={loading}
                    />

                    <Input
                        required
                        name='password'
                        type='password'
                        label='Senha'
                        placeholder='Digite sua senha'
                        register={register}
                        error={errors.password && 'Este campo é obrigatório'}
                        readOnly={loading}
                    />

                    <button className={styles.recoveryLink} type='button' onClick={() => setShow(2)}>
                        Esqueci minha senha
                    </button>
                </Flex>

                <Button mt='3' type='submit' loading={loading}>
                    Login
                </Button>
            </Flex>
        </form>
    )
}
