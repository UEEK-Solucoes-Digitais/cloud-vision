import SeoAplication from '@global/components/seo/SeoAplication'
import { Layout } from '@/components/layout/Layout'
import { ReactNode } from 'react'
import parse from 'html-react-parser'
import { ICookies } from '@global/types/models/IPolicies'
interface IProps {
    content: ICookies
}

function CookiesPolitic({ content }: IProps) {
    return (
        <>
            <SeoAplication title={content.cookies_seo_title} description={content.cookies_seo_description} />

            <section className=''>
                <div className=''>
                    <h2 className=''>{content.cookies_title}</h2>
                    <p className=''>{parse(content.cookies_text)}</p>
                </div>
            </section>
        </>
    )
}

CookiesPolitic.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default CookiesPolitic
