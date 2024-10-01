import type { ReactNode } from 'react'
import Flex from '../flex/Flex'
import Heading from '../heading/Heading'

type CommonValues = '0' | '1' | '2' | '3' | '4' | '5'

interface IProps {
    title: string
    children: ReactNode
    mt?: CommonValues
    mb?: CommonValues
}

export default function Group({ title, children, mt = '3', mb = '3' }: IProps) {
    return (
        <Flex direction='column' gap={30} mt={mt} mb={mb}>
            <Heading as='h3' align='start'>
                {title}
            </Heading>

            {children}
        </Flex>
    )
}
