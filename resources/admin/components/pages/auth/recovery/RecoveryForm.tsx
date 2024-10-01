import type { GeralFormProps, RecoveryInputs } from '@admin/components/pages/auth/types'
import { GenericErrorData } from '@admin/consts/generic-error'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import Button from '@admin/components/shared/button/Button'
import Flex from '@admin/components/shared/flex/Flex'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import Text from '@admin/components/shared/text/Text'
import setShowToast from '@admin/utils/setShowToast'

import styles from './styles.module.scss'

export default function RecoveryForm({ show, setShow, className }: GeralFormProps) {
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RecoveryInputs>()

    const sendRecovery: SubmitHandler<RecoveryInputs> = async (data) => {
        setLoading(true)
        try {
            api.post('/api/auth/recovery', data)
                .then((response) => {
                    if (response.status === 200) {
                        const data = response.data

                        setLoading(false)
                        setShowToast(showToast, data)
                    }
                })
                .catch((error) => {
                    const data = error.response.data?.message ? error.response.data : GenericErrorData
                    setLoading(false)
                    setShowToast(showToast, data)
                })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setLoading(false)
                setShowToast(showToast, GenericErrorData)
            }
        }
    }

    if (!show) {
        return null
    }

    return (
        <form onSubmit={handleSubmit(sendRecovery)} className={className}>
            <Flex direction='column' align='center' justify='center' gap={40}>
                <Flex direction='column' align='start' gap={10}>
                    <Flex align='center'>
                        <button type='button' onClick={() => setShow(1)} className={styles.headingButton}>
                            <Icon icon='tabler:chevron-left' />
                        </button>
                        <Heading as='h1' align='start'>
                            Recuperar senha
                        </Heading>
                    </Flex>
                    <Text as='p' align='start'>
                        Enviaremos um link para redefinição no seu email
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
                    />
                </Flex>

                <Button mt='3' type='submit' loading={loading}>
                    Enviar
                </Button>
            </Flex>
        </form>
    )
}
