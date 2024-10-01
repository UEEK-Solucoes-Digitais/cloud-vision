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
import IContactInfo from '@global/types/models/ContactInfo'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps extends BasicContentTypes {
    contactInfo: IContactInfo
}

function Page({ contactInfo, content }: IProps) {
    SetPageSetting('lucide:phone', content.title)

    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const disabled = loading || success

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IContactInfo>()

    const submit: SubmitHandler<IContactInfo> = async (data) => {
        if (disabled) return

        const formData = new FormData()

        for (const [key, value] of Object.entries(data)) {
            const stringValue = typeof value === 'number' ? value.toString() : value
            formData.append(key, stringValue)
        }

        setLoading(true)
        try {
            const response = await api.post(route('admin.contact_info.submit'), formData, {
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
                            Editar informações de contato
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
                        Redes Sociais
                    </Heading>

                    <Grid columns={3} gap={20}>
                        <Input
                            defaultValue={contactInfo.facebook ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Facebook'
                            type='text'
                            register={register}
                            name='facebook'
                            maxLength={100}
                            setValue={setValue}
                            error={errors.facebook && 'Verifique esse campo'}
                        />
                        <Input
                            defaultValue={contactInfo.instagram ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Instagram'
                            type='text'
                            register={register}
                            name='instagram'
                            maxLength={100}
                            setValue={setValue}
                            error={errors.instagram && 'Verifique esse campo'}
                        />
                        <Input
                            defaultValue={contactInfo.youtube ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Youtube'
                            type='text'
                            register={register}
                            name='youtube'
                            mask='phone'
                            setValue={setValue}
                            error={errors.youtube && 'Verifique esse campo'}
                        />
                    </Grid>

                    <Divider weight={1} />

                    <Heading as='h3' align='start'>
                        Contato
                    </Heading>

                    <Grid columns={3} gap={20}>
                        <Input
                            defaultValue={contactInfo.email ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Email'
                            type='text'
                            register={register}
                            name='email'
                            maxLength={100}
                            setValue={setValue}
                            error={errors.email && 'Verifique esse campo'}
                        />
                        <Input
                            defaultValue={contactInfo.phone ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Telefone'
                            type='text'
                            register={register}
                            name='phone'
                            maxLength={16}
                            setValue={setValue}
                            error={errors.phone && 'Verifique esse campo'}
                        />
                        <Input
                            defaultValue={contactInfo.whatsapp ?? ''}
                            required={false}
                            placeholder='Digite aqui'
                            label='Whatsapp'
                            type='text'
                            register={register}
                            name='whatsapp'
                            mask='phone'
                            maxLength={16}
                            setValue={setValue}
                            error={errors.whatsapp && 'Verifique esse campo'}
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
