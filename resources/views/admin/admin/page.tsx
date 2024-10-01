import { Layout } from '@admin/components/shared/layout/Layout'
import { ChangeEvent, ReactNode, useState } from 'react'

import Button from '@admin/components/shared/button/Button'
import Checkbox from '@admin/components/shared/checkbox/checkbox'
import Flex from '@admin/components/shared/flex/Flex'
import Heading from '@admin/components/shared/heading/Heading'
import Icon from '@admin/components/shared/iconify/IconifyIcon'
import Modal from '@admin/components/shared/modal/Modal'
import Status from '@admin/components/shared/status/status'
import { Table } from '@admin/components/shared/table/table'
import Text from '@admin/components/shared/text/Text'
import SeoAplication from '@global/components/seo/SeoAplication'
import { useToast } from '@admin/contexts/useToastContext'
import { api } from '@global/services/api'
import IAdmin from '@global/types/models/Admin'
import BasicContentTypes from '@global/types/models/BasicContent'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { router } from '@inertiajs/react'
import moment from 'moment'

interface IProps extends BasicContentTypes {
    admins: IAdmin[]
}

function Page({ admins, content }: IProps) {
    SetPageSetting('lucide:users', content.title)

    const { showToast } = useToast()
    const [allCheckboxes, setAllCheckboxes] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteName, setDeleteName] = useState('')
    const [checkboxesValues, setCheckboxesValues] = useState<any>({})

    const checkboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target
        setCheckboxesValues((prevData: any) => ({
            ...prevData,
            [name]: !prevData[name],
        }))
    }

    async function deleteItens() {
        const toRemove = Object.entries(checkboxesValues)
            .filter(([value]) => value)
            .map(([key]) => key)

        setLoading(true)
        try {
            const response = await api.put(route('admin.admins.remove'), toRemove)

            if (response.status === 200) {
                const data = response.data

                setLoading(false)
                setDeleteModal(false)
                setShowToast(showToast, data)

                router.reload({ only: ['admins'], preserveState: true, preserveScroll: true })
            }
        } catch (error: unknown) {
            setLoading(false)
            setDeleteModal(false)
            GetCatchError({ showToast, error })
        }

        setCheckboxesValues({})
    }

    return (
        <>
            <SeoAplication title={content.seoTitle} description={content.seoDescription} />

            <Flex direction='column' gap={5} mb='5'>
                <Flex align='center' gap={20}>
                    <Heading as='h1' align='start'>
                        Administradores
                    </Heading>
                    <Flex align='center' gap={10}>
                        <Button icon type='link' href={route('admin.admins.form')}>
                            <Icon icon='lucide:plus' />
                        </Button>

                        {admins.length > 0 && (
                            <Button
                                icon
                                hidden={!Object.values(checkboxesValues).some((element) => element === true)}
                                type='button'
                                visual='delete'
                                onClick={() => {
                                    setDeleteName('all')
                                    setDeleteModal(true)
                                }}>
                                <Icon icon='lucide:trash' />
                            </Button>
                        )}
                    </Flex>
                </Flex>
                <Text as='p' dark>
                    Todos os administradores cadastrados estão exibidos aqui, clique no botão azul para adicionar um
                    novo,
                    <br />
                    ou nas ações da tabela para editar ou excluir um já existente
                </Text>
            </Flex>

            {/* TODO: função de search, paginação e linhas */}
            <Table.Search onSubmit={(searchData) => console.log(searchData)} />
            <Table.Root>
                <Table.Header>
                    <Table.Row highlight={allCheckboxes}>
                        <Table.Cell>
                            <Flex align='center' gap={20}>
                                <Checkbox
                                    checked={allCheckboxes}
                                    onChange={() => {
                                        setAllCheckboxes(!allCheckboxes)
                                    }}
                                />
                                Nome
                            </Flex>
                        </Table.Cell>
                        <Table.Cell>E-mail</Table.Cell>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>Data de criação</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {admins.map((admin) => (
                        <Table.Row key={admin.id} highlight={allCheckboxes || checkboxesValues[admin.id]}>
                            <Table.Cell>
                                <Flex align='center' gap={20}>
                                    <Checkbox
                                        checked={allCheckboxes || checkboxesValues[admin.id]}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setAllCheckboxes(false)
                                            checkboxChange(e)
                                        }}
                                        name={admin.id.toString()}
                                    />
                                    {admin.name}
                                </Flex>
                            </Table.Cell>
                            <Table.Cell>{admin.email}</Table.Cell>
                            <Table.Cell>
                                <Status color={`${admin.status ? 'green' : 'red'}`}>
                                    {admin.status ? 'Ativo' : 'Inativo'}
                                </Status>
                            </Table.Cell>
                            <Table.Cell>{moment.utc(admin.created_at).format('DD/MM/YYYY HH:mm:ss')}</Table.Cell>
                            <Table.Cell>
                                <Flex align='center' justify='end' gap={20}>
                                    <Button
                                        type='link'
                                        href={route('admin.admins.form', admin.id)}
                                        table
                                        color={'yellow'}>
                                        <Icon icon='lucide:pen-square' />
                                    </Button>

                                    {admins.length > 0 && (
                                        <Button
                                            type='button'
                                            table
                                            color={'red'}
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setCheckboxesValues({ [admin.id]: true })
                                                setDeleteName(admin.name)
                                            }}>
                                            <Icon icon='lucide:trash' />
                                        </Button>
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                    {admins.length === 0 && (
                        <Table.Row>
                            <Flex align='center' justify='center'>
                                Nenhum registro encontrado.
                            </Flex>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>

            <Modal
                show={deleteModal}
                setShow={setDeleteModal}
                title={`${deleteName === 'all' ? 'Excluir vários itens' : `Excluir item - ${deleteName}`}`}>
                <Text as='p' dark>
                    Está certo que deseja excluir {deleteName === 'all' ? 'estes itens' : 'este item'}? Esta ação é
                    irreversível.
                </Text>

                <Flex align='center' gap={10} mt='1'>
                    <Button loading={loading} fitContent type='button' small visual='delete' onClick={deleteItens}>
                        Confirmar
                    </Button>
                    <Button fitContent type='button' small variant='secondary' onClick={() => setDeleteModal(false)}>
                        Cancelar
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}

Page.layout = (page: ReactNode) => <Layout>{page}</Layout>

export default Page
