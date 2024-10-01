import Button from '@admin/components/shared/button/Button'
import Divider from '@admin/components/shared/divider/Divider'
import Flex from '@admin/components/shared/flex/Flex'
import Grid from '@admin/components/shared/grid/Grid'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import { Layout } from '@admin/components/shared/layout/Layout'
import Text from '@admin/components/shared/text/Text'
import SeoAplication from '@global/components/seo/SeoAplication'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
import BasicContentTypes from '@global/types/models/BasicContent'
import IPolicy from '@global/types/models/Policy'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps extends BasicContentTypes {
    policy: IPolicy
    type: 1 | 2 | 3
}

function Page({ content, policy, type }: IProps) {
    let icon: string

    switch (type) {
        case 1:
            icon = 'lucide:cookie'
            break
        case 2:
            icon = 'ic:outline-privacy-tip'
            break
        case 3:
            icon = 'mingcute:paper-line'
            break
        default:
            icon = 'lucide:cookie'
            break
    }

    SetPageSetting(icon, content.title)

    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const disabled = loading || success

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IPolicy>()

    const submit: SubmitHandler<IPolicy> = async (data) => {
        if (disabled) return

        const formData = new FormData()

        formData.append('type', type.toString())

        for (const [key, value] of Object.entries(data)) {
            const stringValue = typeof value === 'number' ? value.toString() : value
            formData.append(key, stringValue)
        }

        setLoading(true)
        try {
            const response = await api.post(route('admin.policies.submit'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                setSuccess(true)
                setShowToast(showToast, response.data)

                setTimeout(() => {
                    setSuccess(false)
                }, 1000)
            }
        } catch (error: unknown) {
            GetCatchError({ showToast, error })
        } finally {
            setLoading(false)
        }
    }

    const prefix = type === 1 ? 'cookies' : type === 2 ? 'privacy' : 'terms'

    return (
        <>
            <SeoAplication title={content.seoTitle} description={content.seoDescription} />

            <form onSubmit={handleSubmit(submit)}>
                <Flex align='start' gap={10} direction='column'>
                    <Flex align='center' gap={10}>
                        <Button type='link' href={route('admin.dashboard')} fitContent variant='noBackground'>
                            <Icon icon='lucide:chevron-left' />
                        </Button>
                        <Heading as='h2' align='start'>
                            Editar{' '}
                            {type === 1
                                ? 'Política de Cookies'
                                : type === 2
                                  ? 'Política de Privacidade'
                                  : 'Termos de Uso'}
                        </Heading>
                    </Flex>
                    <Text as='p' dark>
                        Altere nos campos abaixo as informações
                        <br />
                        de contato
                    </Text>
                </Flex>

                <Flex direction='column' gap={30} mt='5' mb='5'>
                    <Heading as='h3' align='start'>
                        Conteúdo
                    </Heading>

                    <Grid columns={2} gap={20}>
                        <Input
                            defaultValue={policy[`${prefix}_title`] ?? ''}
                            required
                            placeholder='Digite aqui'
                            label='Título'
                            type='text'
                            register={register}
                            name={`${prefix}_title`}
                            maxLength={100}
                            setValue={setValue}
                            error={errors[`${prefix}_title`] && 'Verifique esse campo'}
                        />
                    </Grid>

                    <Input
                        defaultValue={policy[`${prefix}_text`] ?? ''}
                        required
                        placeholder='Digite aqui'
                        label='Texto'
                        type='textarea'
                        register={register}
                        name={`${prefix}_text`}
                        setValue={setValue}
                        error={errors[`${prefix}_text`] && 'Verifique esse campo'}
                        isEditor
                    />
                </Flex>

                <Divider weight={1} />

                <Flex direction='column' gap={30} mt='5' mb='5'>
                    <Heading as='h3' align='start'>
                        SEO - Otimização de Mecanismos de Busca
                    </Heading>

                    <Grid columns={2} gap={20}>
                        <Input
                            defaultValue={policy[`${prefix}_seo_title`] ?? ''}
                            required
                            placeholder='Digite aqui'
                            label='Título'
                            type='text'
                            register={register}
                            name={`${prefix}_seo_title`}
                            error={errors[`${prefix}_seo_title`] && 'Este campo é obrigatório'}
                        />
                    </Grid>

                    <Grid columns={2} gap={20}>
                        <Input
                            defaultValue={policy[`${prefix}_seo_description`] ?? ''}
                            required
                            placeholder='Digite aqui'
                            label='Texto'
                            type='textarea'
                            register={register}
                            name={`${prefix}_seo_description`}
                            error={errors[`${prefix}_seo_description`] && 'Este campo é obrigatório'}
                        />
                    </Grid>
                </Flex>

                <Flex align='center' justify='start' gap={20} mt='5'>
                    <Button type='submit' fitContent loading={loading}>
                        Enviar
                    </Button>
                    <Button type='link' href={route('admin.dashboard')} fitContent variant='secondary'>
                        Cancelar
                    </Button>
                </Flex>
            </form>
        </>
    )
}

Page.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default Page
