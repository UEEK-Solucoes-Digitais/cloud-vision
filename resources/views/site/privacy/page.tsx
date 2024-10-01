import SeoAplication from '@global/components/seo/SeoAplication'
import { Layout } from '@/components/layout/Layout'
import { ReactNode } from 'react'
import parse from 'html-react-parser'
import { IPrivacy } from '@global/types/models/IPolicies'
interface IProps {
    content: IPrivacy
}

function PrivacyPolicy({ content }: IProps) {
    return (
        <>
            <SeoAplication title={content.privacy_seo_title} description={content.privacy_seo_description} />

            <section className=''>
                <div className=''>
                    <h2 className=''>{content.privacy_title}</h2>
                    <p className=''>{parse(content.privacy_text)}</p>
                </div>
            </section>
        </>
    )
}

PrivacyPolicy.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default PrivacyPolicy
