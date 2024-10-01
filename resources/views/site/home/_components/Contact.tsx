// import { Article, Opportunity, Security } from '@/components/SVG/Icons'
import { Contact } from '@/types/models/Site'
import getIconName from '@/utils/getIconName'
import * as Iconsax from 'iconsax-react'
import { DynamicIcon } from '../../dynamic-icon/DynamicIcon'

interface IProps {
    contacts: Contact[]
}

export default function ContactsUs({ contacts }: IProps) {
    return (
        <div className='w-full'>
            <h2 className='pb-4 md:pb-10'>
                Alguma dúvida? <br />
                Entre em contato com a gente
            </h2>

            {contacts.map((contact) => (
                <div className='flex items-center space-x-4 my-4 md:my-6' key={contact.id}>
                    <div className='bg-grayLight p-2.5 rounded-lg'>
                        <DynamicIcon
                            iconName={getIconName(contact.icon ?? '') as keyof typeof Iconsax}
                            size={20}
                            color='#003333'
                        />
                    </div>

                    <div className='flex flex-col items-start'>
                        <h3>{contact.title}</h3> <p className='text-primaryColor'>{contact.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
