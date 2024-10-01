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
import BasicContentTypes from '@global/types/models/BasicContent'
import SetPageSetting from '@admin/utils/SetPageSettings'
import { GetCatchError } from '@admin/utils/getCatchApi'
import setShowToast from '@admin/utils/setShowToast'
import { router } from '@inertiajs/react'
import moment from 'moment'
import IBanner from '@global/types/models/Banner'
import parse from 'html-react-parser'
import ImagePath from '@global/consts/ImagePath'

interface IProps extends BasicContentTypes {
    banners: IBanner[]
}

function Page({ banners, content }: IProps) {
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

        console.log(checkboxesValues)
    }

    async function deleteItens() {
        const toRemove = Object.entries(checkboxesValues)
            .filter(([value]) => value)
            .map(([key]) => key)

        setLoading(true)
        try {
            const response = await api.put(route('admin.banners.remove'), toRemove)

            if (response.status === 200) {
                const data = response.data

                setLoading(false)
                setDeleteModal(false)
                setShowToast(showToast, data)

                router.reload({ only: ['banners'], preserveState: true, preserveScroll: true })
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
                        Banners
                    </Heading>
                    <Flex align='center' gap={10}>
                        <Button icon type='link' href={route('admin.banners.form')}>
                            <Icon icon='lucide:plus' />
                        </Button>

                        {banners.length > 0 && (
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
                    Todos os banners cadastrados estão exibidos aqui, clique no botão azul para adicionar um novo,
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
                                Título
                            </Flex>
                        </Table.Cell>
                        <Table.Cell>Descriçãop</Table.Cell>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>Data de criação</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {banners.map((banner) => (
                        <Table.Row key={banner.id} highlight={allCheckboxes || checkboxesValues[banner.id]}>
                            <Table.Cell>
                                <Flex align='center' gap={20}>
                                    <Checkbox
                                        checked={allCheckboxes || checkboxesValues[banner.id]}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setAllCheckboxes(false)
                                            checkboxChange(e)
                                        }}
                                        name={banner.id.toString()}
                                    />
                                    <Flex direction='row' align='center' gap={10}>
                                        {banner.image && (
                                            <img
                                                loading='lazy'
                                                width={130}
                                                height={70}
                                                style={{ width: '130px', borderRadius: '10px' }}
                                                alt={banner.title}
                                                src={`${ImagePath.UPLOADS}/banners/${banner.image}`}
                                            />
                                        )}
                                        <b>{banner.title}</b>
                                    </Flex>
                                </Flex>
                            </Table.Cell>
                            <Table.Cell overflowEllipsis>{parse(banner.description)}</Table.Cell>
                            <Table.Cell>
                                <Status color={`${banner.status ? 'green' : 'red'}`}>
                                    {banner.status ? 'Ativo' : 'Inativo'}
                                </Status>
                            </Table.Cell>
                            <Table.Cell>{moment.utc(banner.created_at).format('DD/MM/YYYY HH:mm:ss')}</Table.Cell>
                            <Table.Cell>
                                <Flex align='center' justify='end' gap={20}>
                                    <Button
                                        type='link'
                                        href={route('admin.banners.form', banner.id)}
                                        table
                                        color={'yellow'}>
                                        <Icon icon='lucide:pen-square' />
                                    </Button>

                                    {banners.length > 0 && (
                                        <Button
                                            type='button'
                                            table
                                            color={'red'}
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setCheckboxesValues({ [banner.id]: true })
                                                setDeleteName(banner.title)
                                            }}>
                                            <Icon icon='lucide:trash' />
                                        </Button>
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                    {banners.length === 0 && (
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
