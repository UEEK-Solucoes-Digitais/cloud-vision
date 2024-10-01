import IconifyIcon from '../../iconify/IconifyIcon'
import styles from '../styles.module.scss'
import Flex from '@admin/components/shared/flex/Flex'
import Text from '@admin/components/shared/text/Text'
import { usePageSettings } from '@admin/contexts/usePageTitleContext'
import { AdminLogout } from '@admin/services/auth'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type Dispatch, type SetStateAction, useState } from 'react'
import Button from '../../button/Button'
import Modal from '../../modal/Modal'

function Logout({
    deleteModal,
    setDeleteModal,
}: {
    deleteModal: boolean
    setDeleteModal: Dispatch<SetStateAction<boolean>>
}) {
    const [loading, setLoading] = useState(false)

    async function onClick() {
        if (loading) return

        setLoading(true)

        try {
            await AdminLogout()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal show={deleteModal} setShow={setDeleteModal} title='Logout'>
            <Text as='p' dark>
                Está certo que deseja fazer logout?
            </Text>

            <Flex align='center' gap={10} mt='1'>
                <Button fitContent loading={loading} type='button' small visual='delete' onClick={onClick}>
                    Confirmar
                </Button>

                <Button fitContent type='button' small variant='secondary' onClick={() => setDeleteModal(false)}>
                    Cancelar
                </Button>
            </Flex>
        </Modal>
    )
}

export default function Header() {
    const { pageSettings } = usePageSettings()

    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <>
            <header className={styles.headerWrapper}>
                <Flex align='center' direction='row' gap={15} className={styles.flexItens}>
                    <IconifyIcon icon={pageSettings.pageIcon} className={styles.pageIcon} />
                    <Text as='p' className={styles.pageTitle}>
                        {pageSettings.pageTitle}
                    </Text>
                </Flex>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button style={{ border: 'none', background: 'none' }} type='button'>
                            <Flex
                                align='center'
                                direction='row'
                                gap={5}
                                className={`${styles.flexItens} ${styles.user}`}>
                                <div className={styles.userIcon}>
                                    <IconifyIcon icon='lucide:user' />
                                </div>
                                <IconifyIcon icon='lucide:chevron-down' className={styles.downArrow} />
                            </Flex>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className={styles.dropdownMenuContent}>
                            <DropdownMenu.Item className={styles.dropdownMenuItem} onClick={() => setDeleteModal(true)}>
                                Fazer logout
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Logout deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
            </header>
        </>
    )
}
