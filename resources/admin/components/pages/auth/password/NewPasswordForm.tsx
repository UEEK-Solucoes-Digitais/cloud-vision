// import Heading from '@admin/components/shared/heading/Heading'
// import Text from '@admin/components/shared/text/Text'
// import Input from '@admin/components/shared/input/Input'
// import Button from '@admin/components/shared/button/Button'
// import Flex from '@admin/components/shared/flex/Flex'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import { NewPasswordInputs, GeralFormProps } from '@admin/components/pages/auth/types'
// import { useState } from 'react'
// import { useSearchParams, useRouter, usePathname } from 'next/navigation'
// import getFetcher from '@admin/app/(admin)/utils/getFetcher'
// import useSWR from 'swr'
// import axios from 'axios'
// import setShowToast from '@admin/app/(admin)/utils/setShowToast'
// import { useToast } from '@admin/contexts/(admin)/useToastContext'
// import { AxiosConfig } from '@admin/consts/axios-config'
// import { GenericErrorData } from '@admin/consts/generic-error'
// import Loading from '@admin/components/shared/loading/Loading'

// export default function NewPasswordForm({ show, setShow, className }: GeralFormProps) {
//     const [loading, setLoading] = useState<boolean>(false)
//     const { showToast } = useToast()
//     const searchParams = useSearchParams()
//     const router = useRouter()
//     const pathname = usePathname()

//     const hash = searchParams.get('recovery')
//     const { data, error, isLoading } = useSWR(`/api/auth/check-hash/${hash}`, getFetcher)

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<NewPasswordInputs>()

//     const sendNewPassword: SubmitHandler<NewPasswordInputs> = async (data) => {
//         if (data.password !== data.confirmPassword) {
//             setShowToast(showToast, {
//                 title: 'As senhas devem ser iguais.',
//                 message: 'O campo de senha e de confirmação devem ser iguais.',
//                 type: 'alert',
//             })
//             return null
//         }

//         setLoading(true)
//         try {
//             axios
//                 .post('/api/auth/new-password', data, AxiosConfig)
//                 .then((response) => {
//                     if (response.status == 200) {
//                         const data = response.data

//                         setLoading(false)
//                         setShowToast(showToast, data)

//                         setTimeout(() => {
//                             router.replace(pathname)
//                             setShow(1)
//                         }, 2000)
//                     }
//                 })
//                 .catch((error) => {
//                     const data = error.response.data?.message ? error.response.data : GenericErrorData
//                     setLoading(false)
//                     setShowToast(showToast, data)
//                 })
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 setLoading(false)
//                 setShowToast(showToast, GenericErrorData)
//             }
//         }
//     }

//     if (!show) {
//         return null
//     }

//     if (isLoading) {
//         return <Loading />
//     }

//     if (error) {
//         return <p>{error}</p>
//     }

//     return (
//         <form onSubmit={handleSubmit(sendNewPassword)} className={className}>
//             <Flex direction='column' align='center' justify='center' gap={40}>
//                 <Flex direction='column' align='start' gap={10}>
//                     <Heading as='h1' align='start'>
//                         Recuperar senha - {data.admin.name}
//                     </Heading>
//                     <Text as='p' align='start'>
//                         Digite sua nova senha
//                     </Text>
//                 </Flex>

//                 <Flex direction='column' align='center' gap={20} mt='2'>
//                     <Input required name='id' type='hidden' register={register} defaultValue={data.admin.id} />
//                     <Input
//                         required
//                         name='password'
//                         type='password'
//                         label='Nova senha'
//                         placeholder='Digite a nova senha'
//                         register={register}
//                         error={errors.password && 'Este campo é obrigatório'}
//                     />
//                     <Input
//                         required
//                         name='confirmPassword'
//                         type='password'
//                         label='Confirme a nova senha'
//                         placeholder='Confirme a nova senha'
//                         register={register}
//                         error={errors.confirmPassword && 'Este campo é obrigatório'}
//                     />
//                 </Flex>

//                 <Button mt='3' type='submit' loading={loading}>
//                     Redefinir senha
//                 </Button>
//             </Flex>
//         </form>
//     )
// }
