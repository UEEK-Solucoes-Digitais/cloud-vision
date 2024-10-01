import Button from '@admin/components/shared/button/Button'
import Flex from '@admin/components/shared/flex/Flex'
import Grid from '@admin/components/shared/grid/Grid'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import { Layout } from '@admin/components/shared/layout/Layout'
import Text from '@admin/components/shared/text/Text'
import SeoAplication from '@global/components/seo/SeoAplication'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
// import BasicContentTypes from '@global/types/models/BasicContent'
import BasicContentTypes from '@global/types/models/BasicContent'
import { IPageHome } from '@global/types/models/PageHome'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps extends BasicContentTypes {
    pageHome: IPageHome
}

function Page({ pageHome, content }: IProps) {
    SetPageSetting('lucide:newspaper', content.title)

    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const disabled = loading || success

    const {
        register,
        handleSubmit,
        // setValue,
        formState: { errors },
    } = useForm<IPageHome>()

    const submit: SubmitHandler<IPageHome> = async (data) => {
        if (disabled) return

        // *EXAMPLE: atribuição de imagem
        // if (data.image) data.image = data.image[0]

        const formData = new FormData()

        for (const [key, value] of Object.entries(data)) {
            const stringValue = typeof value === 'number' ? value.toString() : value
            formData.append(key, stringValue)
        }

        setLoading(true)
        try {
            const response = await api.post(route('admin.page_home.submit'), formData, {
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
                            Editar página home
                        </Heading>
                    </Flex>
                    <Text as='p' dark>
                        Altere nos campos abaixo as informações
                        <br />
                        da página
                    </Text>
                </Flex>

                {/* *EXAMPLE: Divider */}
                {/* <Divider weight={1} /> */}

                <Flex direction='column' gap={30} mt='5' mb='5'>
                    <Heading as='h3' align='start'>
                        SEO - Otimização de Mecanismos de Busca
                    </Heading>

                    <Grid columns={2} gap={20}>
                        <Input
                            defaultValue={pageHome.seo_title ?? ''}
                            required
                            placeholder='Digite aqui'
                            label='Título'
                            type='text'
                            register={register}
                            name='seo_title'
                            error={errors.seo_title && 'Este campo é obrigatório'}
                        />
                    </Grid>

                    <Grid columns={2} gap={20}>
                        <Input
                            defaultValue={pageHome.seo_description ?? ''}
                            required
                            placeholder='Digite aqui'
                            label='Texto'
                            type='textarea'
                            register={register}
                            name='seo_description'
                            error={errors.seo_description && 'Este campo é obrigatório'}
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
