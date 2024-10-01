import React, { ComponentProps, useRef, useEffect } from 'react'
import Button from '../button/Button'
import Flex from '../flex/Flex'
import Heading from '../heading/Heading'
import IconifyIcon from '../iconify/IconifyIcon'
import clsx from 'clsx'
import styles from './styles.module.scss'
import Box from '../box/Box'

interface ModalProps extends ComponentProps<'dialog'> {
    children?: React.ReactNode
    show: boolean
    setShow: (show: boolean) => void
    title: string
}

const Modal: React.FC<ModalProps> = ({ children, show, setShow, title }) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (show) {
            dialogRef.current?.showModal()
            document.documentElement.style.overflow = 'hidden'
        } else {
            dialogRef.current?.close()
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.documentElement.style.overflow = ''
        }
    }, [show])

    const classes = clsx(styles.dialogContainer)

    if (!show) {
        return null
    }

    return (
        <dialog ref={dialogRef} className={classes}>
            <Box radius='2' p='2'>
                <Flex direction='column' gap={20}>
                    <Flex align='center' justify='space-between'>
                        <Heading align='start' as='h3'>
                            {title}
                        </Heading>
                        <Button fitContent type='button' variant='noBackground' onClick={() => setShow(false)}>
                            <IconifyIcon icon='lucide:x' />
                        </Button>
                    </Flex>
                    {children}
                </Flex>
            </Box>
        </dialog>
    )
}

export default Modal
