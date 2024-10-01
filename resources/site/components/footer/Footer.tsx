import { Link as InertiaLink } from '@inertiajs/react'
import { Link } from '@/components/link/Link'
import { UEEK } from '@/components/shared/svg-icons/Icons'

export default function Footer() {
    return (
        <footer className='my-3 bottom-0 ' id='footer'>
            <div className='content py-4 '>
                {' '}
                <div className=' flex flex-col md:flex-row justify-between items-center text-center text-sm space-y-4 text-gray'>
                    <InertiaLink href={route('site.home')} title='Logo Cesp'>
                        <img src='/assets/images/brand/logo.svg' alt='Logo Cesp' />
                    </InertiaLink>
                    <div className='flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0'>
                        <div className='hover:text-primaryColor'>
                            <Link text='Inicio' href={route('site.home')} />
                        </div>
                    </div>{' '}
                </div>
                <UEEK />
            </div>
        </footer>
    )
}
