<?php

class ViewOperations
{
    public static function createViews($instance_name, $instance_name_views, $columns, $class_name)
    {
        $unique_view = true;
        foreach (explode(",", $columns) as $column) {
            $column = trim($column);

            switch (true) {
                case stripos($column, 'position') !== false:
                    $unique_view = false;
                    break;
                case stripos($column, 'status') !== false:
                    $unique_view = false;
                    break;
            }
        }

        // Verificando se a pasta que o controller vai ser armazenado já existe
        // Caso não exista, a pasta é criada utilizando a função mkdir()
        $path = base_path() . DIRECTORY_SEPARATOR . "resources" . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . "admin" . DIRECTORY_SEPARATOR  . $instance_name[0];

        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
        if (!is_dir($path . DIRECTORY_SEPARATOR . "form")) {
            mkdir($path . DIRECTORY_SEPARATOR . "form", 0755, true);
        }

        if (!$unique_view) {
            self::createIndexView($instance_name, $instance_name_views, explode(",", $columns), $class_name);
        }
        self::createFormView($instance_name, $instance_name_views, $columns, $class_name);
    }

    public static function createIndexView($instance_name, $instance_name_views, $columns, $class_name)
    {
        $file_path = base_path() . DIRECTORY_SEPARATOR . "resources" . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . "admin" . DIRECTORY_SEPARATOR . $instance_name[0] . DIRECTORY_SEPARATOR . "page.tsx";

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        // Criamos o arquivo com a permissão de write
        $index_file = fopen($file_path, "w");

        $name_plural = trim($instance_name[0]);
        $name_singular = trim($instance_name[1]);

        $columns[0] = trim($columns[0]);

        $text =
            "
            import { Layout } from '@admin/components/shared/layout/Layout'
            import { type ChangeEvent, type ReactNode, useState } from 'react'

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
            import type I" . $class_name . " from '@global/types/models/" . $class_name . "'
            import type BasicContentTypes from '@global/types/models/BasicContent'
            import SetPageSetting from '@admin/utils/SetPageSettings'
            import { GetCatchError } from '@admin/utils/getCatchApi'
            import setShowToast from '@admin/utils/setShowToast'
            import { router } from '@inertiajs/react'
            import moment from 'moment'

            interface IProps extends BasicContentTypes {
                " . $name_plural . ": I" . $class_name . "[]
            }

            function Page({ " . $name_plural . ", content }: IProps) {
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
                        const response = await api.put(route('admin." . $name_plural . ".remove'), toRemove)

                        setLoading(false)
                        setDeleteModal(false)
                        setShowToast(showToast, {
                            type: response.data.type,
                            title: response.data.title,
                            message: response.data.message,
                        })

                        if (response.data.status === 1) {
                            router.reload({ only: ['" . $name_plural . "'], preserveState: true, preserveScroll: true })
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
                                    " . $instance_name_views . "
                                </Heading>
                                <Flex align='center' gap={10}>
                                    <Button icon type='link' href={route('admin." . $name_plural . ".form')}>
                                        <Icon icon='lucide:plus' />
                                    </Button>

                                    {" . $name_plural . ".length > 0 && (
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
                                Todos os itens cadastrados estão exibidos aqui, clique no botão azul para adicionar um novo,
                                <br />
                                ou nas ações da tabela para editar ou excluir um já existente
                            </Text>
                        </Flex>

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
                                    <Table.Cell>Status</Table.Cell>
                                    <Table.Cell>Data de criação</Table.Cell>
                                    <Table.Cell />
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {" . $name_plural . ".map((" . $name_singular . ": I" . $class_name . ") => (
                                    <Table.Row key={" . $name_singular . ".id} highlight={allCheckboxes || checkboxesValues[" . $name_singular . ".id]}>
                                        <Table.Cell>
                                            <Flex align='center' gap={20}>
                                                <Checkbox
                                                    checked={allCheckboxes || checkboxesValues[" . $name_singular . ".id]}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                        setAllCheckboxes(false)
                                                        checkboxChange(e)
                                                    }}
                                                    name={" . $name_singular . ".id.toString()}
                                                />
                                                {" . $name_singular . "." . trim($columns[0]) . "}
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Status color={`\${" . $name_singular . " . status ? 'green' : 'red'}`}>
                                                {" . $name_singular . ".status ? 'Ativo' : 'Inativo'}
                                            </Status>
                                        </Table.Cell>
                                        <Table.Cell>{moment.utc(" . $name_singular . ".created_at).format('DD/MM/YYYY HH:mm:ss')}</Table.Cell>
                                        <Table.Cell>
                                            <Flex align='center' justify='end' gap={20}>
                                                <Button
                                                    type='link'
                                                    href={route('admin." . $name_plural . ".form', " . $name_singular . ".id)}
                                                    table
                                                    color={'yellow'}>
                                                    <Icon icon='lucide:pen-square' />
                                                </Button>

                                                {" . $name_plural . ".length > 0 && (
                                                    <Button
                                                        type='button'
                                                        table
                                                        color={'red'}
                                                        onClick={() => {
                                                            setDeleteModal(true)
                                                            setCheckboxesValues({ [" . $name_singular . ".id]: true })
                                                            setDeleteName(" . $name_singular . "." . $columns[0] . ")
                                                        }}>
                                                        <Icon icon='lucide:trash' />
                                                    </Button>
                                                )}
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                {" . $name_plural . ".length === 0 && (
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
                            title={`\${deleteName === 'all' ? 'Excluir vários itens' : `Excluir item - \${deleteName}`}`}>
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
        ";

        fwrite($index_file, $text);
    }

    public static function createFormView($instance_name, $instance_name_views, $columns, $class_name)
    {
        // Criamos o arquivo com a permissão de write
        $file_path = base_path() . DIRECTORY_SEPARATOR . "resources" . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . "admin" . DIRECTORY_SEPARATOR . $instance_name[0] . DIRECTORY_SEPARATOR . "form" . DIRECTORY_SEPARATOR . "page.tsx";

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        $add_file = fopen($file_path, "w");

        $html_inputs = "";

        $name_plural = trim($instance_name[0]);
        $name_singular = trim($instance_name[1]);

        $image_data_string = "";
        $first_column = "";

        foreach (explode(",", $columns) as $key => $column) {
            $column = trim($column);

            if ($key === 0) {
                $first_column = $column;
            }

            switch (true) {
                case (stripos($column, 'text') !== false || stripos($column, 'description') !== false) && stripos($column, 'btn') === false:
                    $html_inputs .= self::getInput($name_singular, $column, "textarea");
                    break;
                case stripos($column, 'position') !== false || stripos($column, 'status') !== false || stripos($column, 'webp') !== false:
                    $html_inputs .= '';
                    break;
                case stripos($column, 'image') !== false && stripos($column, "webp") === false:
                    $image_data_string .= "if (data." . $column . ") data." . $column . " = data." . $column . "[0];";
                    $html_inputs .= self::getImageInput($name_singular, $name_plural, $column);
                    break;
                case stripos($column, 'icon') !== false:
                    $html_inputs .= self::getImageInput($name_singular, $name_plural, $column);
                    break;
                default:
                    $html_inputs .= self::getInput($name_singular, $column);
                    break;
            }
        }

        $text =
            "
            import Button from '@admin/components/shared/button/Button'
            import Flex from '@admin/components/shared/flex/Flex'
            import Grid from '@admin/components/shared/grid/Grid'
            import Heading from '@admin/components/shared/heading/Heading'
            import Input from '@admin/components/shared/input/Input'
            import { Layout } from '@admin/components/shared/layout/Layout'
            import SeoAplication from '@global/components/seo/SeoAplication'
            import { useToast } from '@admin/contexts/useToastContext'
            import { api } from '@global/services/api'
            import type BasicContentTypes from '@global/types/models/BasicContent'
            import SetPageSetting from '@admin/utils/SetPageSettings'
            import { GetCatchError } from '@admin/utils/getCatchApi'
            import setShowToast from '@admin/utils/setShowToast'
            import { Icon } from '@iconify/react/dist/iconify.js'
            import { router } from '@inertiajs/react'
            import { type ReactNode, useState } from 'react'
            import { type SubmitHandler, useForm } from 'react-hook-form'
            import type I" . $class_name . " from '@global/types/models/" . $class_name . "'
            import ImageInput from '@admin/components/shared/image-input/ImageInput'
            import ImagePath from '@global/consts/ImagePath'

            interface IProps extends BasicContentTypes {
                " . $name_singular . ": I" . $class_name . "
            }

            function Page({ " . $name_singular . ", content }: IProps) {
                SetPageSetting('lucide:users', content.title)

                const [loading, setLoading] = useState(false)
                const [success, setSuccess] = useState(false)
                const { showToast } = useToast()

                const disabled = loading || success

                const {
                    register,
                    handleSubmit,
                    setValue,
                    formState: { errors },
                } = useForm<I" . $class_name . ">()

                const submit: SubmitHandler<I" . $class_name . "> = async (data) => {
                    if (disabled) return

                    if (" . $name_singular . ") data.id = " . $name_singular . ".id

                    " . $image_data_string . "

                    const formData = new FormData()

                    for (const [key, value] of Object.entries(data)) {
                        const stringValue = typeof value === 'number' ? value.toString() : value
                        formData.append(key, stringValue)
                    }

                    setLoading(true)
                    try {
                        const response = await api.post(route('admin." . $name_plural . ".submit'), formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })

                        setShowToast(showToast, {
                            type: response.data.type,
                            title: response.data.title,
                            message: response.data.message,
                        })

                        if (response.data.status === 1) {
                            if (" . $name_singular . "?.id) {
                                router.reload({ only: ['" . $name_singular . "'], preserveState: true, preserveScroll: true })
                            } else {
                                setSuccess(true)

                                setTimeout(() => {
                                    router.visit(route('admin." . $name_plural . ".index'))
                                }, 2000)
                            }
                        }
                    } catch (error: unknown) {
                        GetCatchError({ showToast, error })
                    } finally {
                        setLoading(false)
                    }
                }

                return (
                    <>
                        <SeoAplication title={content.seoTitle} description={content.seoDescription} />

                        <form onSubmit={handleSubmit(submit)}>
                            <Flex direction='column' gap={30}>
                                <Flex align='center' gap={10}>
                                    <Button type='link' href={route('admin." . $name_plural . ".index')} fitContent variant='noBackground'>
                                        <Icon icon='lucide:chevron-left' />
                                    </Button>

                                    <Heading as='h2' align='start'>{`\${" . $name_singular . " ? 'Editar' : 'Adicionar'} " . $name_singular . " \${" . $name_singular . " ? `- \${" . $name_singular . " . " . $first_column . "}` : ''}`}</Heading>
                                </Flex>

                                <Flex direction='column' gap={30}>

                                    <Grid columns={2} gap={20}>
                                    " . $html_inputs . "
                                    </Grid>

                                    <Flex align='center' justify='start' gap={20}>
                                        <Button type='submit' fitContent loading={loading} disabled={success}>
                                            Enviar
                                        </Button>

                                        <Button
                                            type='link'
                                            href={route('admin." . $name_plural . ".index')}
                                            fitContent
                                            variant='secondary'
                                            disabled={disabled}>
                                            Cancelar
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </form>
                    </>
                )
            }

            Page.layout = (page: ReactNode) => <Layout>{page}</Layout>

            export default Page
        ";
        fwrite($add_file, $text);
    }

    public static function getImageInput($name_singular, $name_plural, $name)
    {
        return "
        <ImageInput
            preview={" . $name_singular . "?." . $name . " ? `\${ImagePath.UPLOADS}/" . $name_plural . "/\${" . $name_singular . "?." . $name . "}` : ''}
            required={!" . $name_singular . "?." . $name . "}
            label='Imagem (500x500px)'
            register={register}
            name='" . $name . "'
            variant='" . (stripos($name_singular, "mobile") !== false ? 'screenBannerMobile' : 'screenBanner') . "'
            error={errors." . $name . " && 'Este campo é obrigatório'}
        />
        ";
    }

    public static function getInput($name_singular, $name, $type = "text")
    {
        return
            "
            <Input
                defaultValue={" . $name_singular . "?." . $name . " ?? ''}
                required
                placeholder='Digite aqui'
                label='" . $name . "'
                type='" . $type . "'
                register={register}
                name='" . $name . "'
                error={errors." . $name . " && 'Este campo é obrigatório'}
                readOnly={disabled}
            />
       ";
    }
}
