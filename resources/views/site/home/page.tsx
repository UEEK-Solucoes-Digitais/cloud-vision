import { Layout } from '@/components/layout/Layout'
import SeoAplication from '@global/components/seo/SeoAplication'
import { api } from '@global/services/api'
import { ReactNode, useState } from 'react'

function Home() {

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const file = formData.get('file')
        console.log(file)

        const response = await api.post(route('site.testImage'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    return (
        <>
            <SeoAplication title="Cloud Vision" description="teste" />

            <form onSubmit={onSubmit}>
                <label htmlFor="">Imagem</label>
                <br/>
                <br/>
                <input type="file" name="file" />
                <br/>
                <br/>
                <button>Send</button>
            </form>

            <h1>Result</h1>
        </>
    )
}

Home.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default Home
