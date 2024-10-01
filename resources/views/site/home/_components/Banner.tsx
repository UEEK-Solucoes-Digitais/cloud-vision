import { Banner } from '@/types/models/Site'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import getIconName from '@/utils/getIconName'
import * as Iconsax from 'iconsax-react'
import { DynamicIcon } from '../../dynamic-icon/DynamicIcon'

import 'swiper/css'
import 'swiper/css/autoplay'

import { Link } from '@/components/site/link/Link'

interface IProps {
    banners: Banner[]
}

export default function BannerSwiper({ banners }: IProps) {
    return (
        <div className='background-banner'>
            <Swiper
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                }}>
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        {/* md:mb-14 lg:mb-10 */}
                        <div className='content z-4 md:flex md:pt-10 justify-between mt-24 max-h-[780px] md:h-[75vh] md:items-center'>
                            <div className='md:flex md:flex-col md:w-1/2 mb-4 md:mb-0'>
                                <h1 className='text-center md:text-left items-center'>
                                    {banner.title}
                                    <span className=' inline-flex w-auto text-green bg-grayLight rounded-full items-center px-3 py-1.5 m-2'>
                                        <DynamicIcon
                                            iconName={getIconName(banner.icon ?? '') as keyof typeof Iconsax}
                                            size={28}
                                            color='#033'
                                        />
                                        <span className='pl-2 text-[18px] lg:text-[20px] xl:text-[28px]'>
                                            {banner.button_text}
                                        </span>
                                    </span>
                                </h1>

                                <div className='space-y-6 flex flex-col justify-center w-full mt-5'>
                                    <p className='text-center md:text-left px-4 md:px-0 text-gray'>
                                        {banner.description}
                                    </p>
                                    <div className='flex items-center justify-center md:justify-start w-full space-x-4 '>
                                        <button className='primaryButton ' type='button'>
                                            <Link text='Cadastre-se' href={route('site.register')} />
                                        </button>
                                        <button
                                            className='font-semibold text-green hover:text-primaryColor transition-all'
                                            type='button'>
                                            <Link text='Fazer login' href={route('dashboard.login')} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='self-end relative md:content'>
                                <div className='flex justify-center'>
                                    {banner.image_url && (
                                        <img
                                            src={banner.image_url}
                                            alt={`Vigilante ${banner.image_url}`}
                                            className='z-10'
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    )}
                                </div>
                                {/* <div className='absolute inset-0 flex justify-center items-center'>
                                    <div className='bg-primaryColor rounded-full h-48 w-48 blur-3xl' />
                                </div> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
