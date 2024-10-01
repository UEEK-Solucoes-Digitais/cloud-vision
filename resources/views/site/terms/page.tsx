import SeoAplication from '@global/components/seo/SeoAplication'
import { Layout } from '@/components/layout/Layout'
import { ReactNode } from 'react'
import parse from 'html-react-parser'
import { ITerms } from '@global/types/models/IPolicies'
interface IProps {
    content: ITerms
}

function UseTerms({ content }: IProps) {
    return (
        <>
            <SeoAplication title={content.terms_seo_title} description={content.terms_seo_description} />

            <section className=''>
                <div className=''>
                    <h2 className=''>{content.terms_title}</h2>
                    <p className=''>{parse(content.terms_text)}</p>
                </div>
            </section>
        </>
    )
}

UseTerms.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default UseTerms
