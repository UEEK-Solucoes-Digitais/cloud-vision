import { LayoutLogin } from '@admin/components/shared/layout/Layout'
import { ReactNode } from 'react'

import LoginAsset from '@admin/assets/login-asset.png'
import LoginBg from '@admin/assets/login-bg.svg'
import Box from '@admin/components/shared/box/Box'
import Flex from '@admin/components/shared/flex/Flex'
import SeoAplication from '@global/components/seo/SeoAplication'
import BasicContentTypes from '@global/types/models/BasicContent'
import Form from './_components/form'

import styles from './page.module.scss'

function Page({ ...props }: BasicContentTypes) {
    return (
        <>
            <SeoAplication title={props.content.seoTitle} description={props.content.seoDescription} />

            <section className={`${styles.main}`} style={{ backgroundImage: 'url()' }}>
                <div className={styles.background}>
                    <img src={LoginBg} width={1920} height={1080} alt='Fundo de login' />
                </div>

                <div className={styles.content}>
                    <Flex align='center' justify='center' gap={180} className={styles.flexContainer}>
                        <Box px='3' py='2' radius='2' className={styles.loginBox}>
                            <Form />
                        </Box>

                        <img
                            className={styles.loginAsset}
                            src={LoginAsset}
                            width={500}
                            height={800}
                            alt='Imagem de uma mulher digitando em um tablet'
                        />
                    </Flex>
                </div>
            </section>
        </>
    )
}

Page.layout = (page: ReactNode) => <LayoutLogin>{page}</LayoutLogin>

export default Page
