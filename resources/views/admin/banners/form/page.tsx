import Button from '@admin/components/shared/button/Button'
import Flex from '@admin/components/shared/flex/Flex'
import Grid from '@admin/components/shared/grid/Grid'
import Heading from '@admin/components/shared/heading/Heading'
import Input from '@admin/components/shared/input/Input'
import { Layout } from '@admin/components/shared/layout/Layout'
import SeoAplication from '@global/components/seo/SeoAplication'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
import BasicContentTypes from '@global/types/models/BasicContent'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { Icon } from '@iconify/react/dist/iconify.js'
import { router } from '@inertiajs/react'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import IBanner from '@global/types/models/Banner'
import ImageInput from '@admin/components/shared/image-input/ImageInput'
import ImagePath from '@global/consts/ImagePath'

interface IProps extends BasicContentTypes {
    banner: IBanner
}

function Page({ banner, content }: IProps) {
    SetPageSetting('lucide:users', content.title)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { showToast } = useToast()

    const disabled = loading || success

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IBanner>()

    const submit: SubmitHandler<IBanner> = async (data) => {
        console.log(data)
        if (disabled) return

        if (banner) data.id = banner.id

        if (data.image) data.image = data.image[0]
        if (data.image_mobile) data.image_mobile = data.image_mobile[0]

        const formData = new FormData()

        for (const [key, value] of Object.entries(data)) {
            const stringValue = typeof value === 'number' ? value.toString() : value
            formData.append(key, stringValue)
        }

        setLoading(true)
        try {
            const response = await api.post(route('admin.banners.submit'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                setSuccess(true)
                setShowToast(showToast, response.data)

                return setTimeout(() => {
                    router.visit(route('admin.banners.index'))
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
                    <Button type='link' href={route('admin.banners.index')} fitContent variant='noBackground'>
                        <Icon icon='lucide:chevron-left' />
                    </Button>
                    <Heading as='h2' align='start'>{`${banner ? 'Editar' : 'Adicionar'} banner ${
                        banner ? `- ${banner.title}` : ''
                    }`}</Heading>
                </Flex>

                <Flex direction='column' gap={30}>
                    <Grid columns={2} gap={20} mt='5'>
                        <Input
                            required
                            defaultValue={banner?.title ?? ''}
                            placeholder='Digite aqui o título do banner'
                            label='Título'
                            type='text'
                            register={register}
                            name='title'
                            error={errors.title && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />
                    </Grid>

                    <Input
                        required={false}
                        defaultValue={banner?.description ?? ''}
                        placeholder='Digite aqui a descrição do banner'
                        label='Descrição (opcional)'
                        type='textarea'
                        register={register}
                        setValue={setValue}
                        name='description'
                        error={errors.description && 'Este campo é obrigatório'}
                        readOnly={disabled}
                        isEditor
                    />

                    <Grid columns={2} gap={20}>
                        <Input
                            required={false}
                            defaultValue={banner?.btn_text ?? ''}
                            placeholder='Digite aqui o texto do botão'
                            label='Texto do botão (opcional)'
                            type='text'
                            register={register}
                            name='btn_text'
                            error={errors.btn_text && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />

                        <Input
                            required={false}
                            defaultValue={banner?.btn_link ?? ''}
                            placeholder='Digite aqui o link do botão'
                            label='Link do botão (opcional)'
                            type='text'
                            register={register}
                            name='btn_link'
                            error={errors.btn_text && 'Este campo é obrigatório'}
                            readOnly={disabled}
                        />
                    </Grid>

                    <Grid columns={2} gap={20}>
                        <ImageInput
                            preview={banner?.image ? `${ImagePath.UPLOADS}/banners/${banner?.image}` : ''}
                            required={!banner?.image}
                            label='Imagem do banner'
                            register={register}
                            name='image'
                            variant='screenBanner'
                            error={errors.image && 'Este campo é obrigatório'}
                        />

                        <ImageInput
                            preview={banner?.image_mobile ? `${ImagePath.UPLOADS}/banners/${banner?.image_mobile}` : ''}
                            required={!banner?.image_mobile}
                            label='Imagem mobile do banner'
                            register={register}
                            name='image_mobile'
                            variant='screenBannerMobile'
                            error={errors.image_mobile && 'Este campo é obrigatório'}
                        />
                    </Grid>

                    <Flex align='center' justify='start' gap={20}>
                        <Button type='submit' fitContent loading={loading} disabled={success}>
                            Enviar
                        </Button>

                        <Button
                            type='link'
                            href={route('admin.banners.index')}
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
