import Button from '@/components/dashboard/ui/button'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email({ message: 'Insira um e-mail válido' }),
    name: z.string(),
    content: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

export function FormContact() {
    const [processing, setProcessing] = useState(false)

    const methods = useForm<FormInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        resolver: zodResolver(formSchema),
    })

    const { handleSubmit, register } = methods

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        console.log(data)

        if (processing) return

        setProcessing(true)

        try {
            const response = await api.post(route('site.lead'), {
                ...data,
            })

            if (response.data.status === 1) {
                // console.log('statusss')
                // toast.success('Mensagem enviado com sucesso!', {
                //     toastId: 'success-toast',
                //     autoClose: 1500,
                // })
            }

            // toast.warning('Ocorreu um erro ao enviar seu contato, tente novamente mais tarde', {
            //     toastId: 'warning-toast',
            // })
        } catch (error) {
            console.error(error)

            // toast.error('Ocorreu um erro ao enviar seu contato, tente novamente mais tarde', {
            //     toastId: 'error-toast',
            // })
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className='w-full '>
            <h2 className='pt-10 md:pt-0 pb-4 md:pb-10 w-full'>Envie uma mensagem</h2>
            <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <input
                    readOnly={processing}
                    className='form-input'
                    required
                    {...register('name')}
                    placeholder='Digite seu nome completo'
                />
                <input
                    className='form-input '
                    required
                    type='email'
                    {...register('email')}
                    readOnly={processing}
                    placeholder='Digite seu e-mail'
                />

                <textarea
                    readOnly={processing}
                    className='form-input'
                    required
                    {...register('content')}
                    placeholder='Digite a mensagem'
                />

                <div className=' w-auto pb-8'>
                    {/* <button className='primaryButton' type='submit'>
                        Enviar
                    </button> */}

                    <Button.Default type='submit' label='Enviar' loading={processing} />
                </div>
            </form>
        </div>
    )
}
