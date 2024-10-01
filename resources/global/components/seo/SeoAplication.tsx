import { Head } from '@inertiajs/react'

interface IProps {
    title: string
    description: string
    image?: string
}

export default function SeoAplication({ title, description, image = '' }: IProps) {
    const metaTitleOg = document.querySelector('meta[property="og:title"]')
    const metaSiteName = document.querySelector('meta[property="og:site_name"]')

    const metaDescription = document.querySelector('meta[name="description"]')
    const metaDescriptionOg = document.querySelector('meta[property="og:description"]')

    const metaImageOg = document.querySelector('meta[property="og:image"]')

    const linkCanonical = document.querySelector('link[rel="canonical"]')

    if (metaTitleOg) {
        metaTitleOg.setAttribute('content', title)
    }

    if (metaSiteName) {
        metaSiteName.setAttribute('content', title)
    }

    if (metaDescription) {
        metaDescription.setAttribute('content', description)
    }

    if (metaDescriptionOg) {
        metaDescriptionOg.setAttribute('content', description)
    }

    if (image && metaImageOg) {
        metaImageOg.setAttribute('content', `${window.location.origin}${image}`)
    }

    if (linkCanonical) {
        linkCanonical.setAttribute('href', window.location.href)
    }

    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}
