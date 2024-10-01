import { Layout } from '@admin/components/shared/layout/Layout'
import { ReactNode } from 'react'

import Heading from '@admin/components/shared/heading/Heading'
import Text from '@admin/components/shared/text/Text'
import SeoAplication from '@global/components/seo/SeoAplication'
import BasicContentTypes from '@global/types/models/BasicContent'
import SetPageSetting from '@admin/utils/SetPageSettings'

import styles from './page.module.scss'

function Page({ ...props }: BasicContentTypes) {
    SetPageSetting('lucide:home', props.content.title)

    return (
        <>
            <SeoAplication title={props.content.seoTitle} description={props.content.seoDescription} />

            <div className={styles.dashboardBox}>
                <Heading align='start' as='h1'>
                    Bem-vindo(a)!
                </Heading>

                <Text as='p'>
                    Estamos empolgados em tê-lo(a) conosco e queremos garantir que sua experiência de uso seja agradável
                    e produtiva. <br />
                    Este CMS foi cuidadosamente desenvolvido para permitir que você gerencie e crie conteúdo de maneira
                    eficiente e intuitiva.
                    <br />
                    <br />
                    Utilize o menu do lado esquerdo para navegar entre as possibilidades do gestor de conteúdo
                </Text>
            </div>
        </>
    )
}

Page.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default Page
