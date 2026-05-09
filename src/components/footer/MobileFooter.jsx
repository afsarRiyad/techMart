import React, { useState } from 'react'
import Container from '../layouts/Container'
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { mobileFooterData } from '../../data/Navigation'
import Facebook from '../../assets/iconsSocial/facebook.svg?react';
import Twitter from '../../assets/iconsSocial/twitter.svg?react';
import Instagram from '../../assets/iconsSocial/instagram.svg?react';
import Pinterest from '../../assets/iconsSocial/pinterest.svg?react';
import Whatsap from '../../assets/iconsSocial/whatsap.svg?react';
import Youtube from '../../assets/iconsSocial/youtube.svg?react';
import Linkedin from '../../assets/iconsSocial/linkedin.svg?react';
import Rss from '../../assets/iconsSocial/rss.svg?react';
import LogoWhite from '../../assets/images/LogoWhite.svg?react';
import Appstore from '../../assets/iconsStore/appstore.svg?react';
import Googleplay from '../../assets/iconsStore/googleplay.svg?react';

const MobileFooter = () => {
    const [activeIndex, setActiveIndex] = useState(null)
    return (
        <Container>
            <div className='bg-gray-100 p-4 lg:hidden '>
                <div className='bg-gray-100 text-black rounded-lg pt-3'>
                    <ul className=' flex flex-col gap-3'>
                        {
                            mobileFooterData.map((item, index) => {
                                return (
                                    <li className='bg-white rounded-lg p-3' key={index}>
                                        <button aria-label='toggle' className='flex justify-between w-full text-inter text-[18px] font-semibold' onClick={() => setActiveIndex(index === activeIndex ? null : index)}>{item.name} <ChevronDown className={`${activeIndex === index ? 'rotate-180' : ''} transition-all duration-300`} /></button>
                                        {item.children &&
                                            <div className={`grid transition-all duration-300 ease-in-out ${activeIndex === index ? 'grid grid-rows-[1fr] opacity-100 overflow-auto ' : 'grid grid-rows-[0fr] opacity-0'}`}>
                                                <div className={`overflow-hidden`}>
                                                    <ul className='mt-3'>
                                                        {item.children.map((child, i) => (
                                                            <li key={i} className='text-blue-400 cursor-pointer pb-2 text-[14px] mobileMenuLink'>{child.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-4 items-center justify-center mt-6'>
                        <Facebook className='cursor-pointer text-blue-500 w-6 h-auto footerSocial' fill='currentColor' />
                        <Twitter className='cursor-pointer text-black w-6 h-auto footerSocial' fill='currentColor' />
                        <Instagram className='cursor-pointer text-pink-500 w-6 h-auto footerSocial' fill='currentColor' />
                        <Pinterest className='cursor-pointer text-red-600 w-6 h-auto footerSocial' fill='currentColor' />
                        <Whatsap className='cursor-pointer text-green-500 w-9 h-auto footerSocial' fill='currentColor' />
                        <Youtube className='cursor-pointer text-red-500 w-9 h-auto footerSocial' fill='currentColor' />
                        <Linkedin className='cursor-pointer text-blue-500 w-9 h-auto footerSocial' fill='currentColor' />
                    </div>
                    <div className='w-full flex justify-center'>
                        <Rss className='cursor-pointer text-orange-500 w-9 h-auto footerSocial' fill='currentColor' />
                    </div>
                </div>
            </div>
            <div className='mb-3 bg-[#333E48] lg:hidden flex flex-col items-center justify-center py-4'>
                <LogoWhite className='w-40 h-auto' />
                <div className='flex flex-col py-3 text-[14px] leading-7 font-inter items-center gap-4'>
                    <span className='text-white '>Experience App on your mobile:
                    </span>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 items-center py-1 px-2 group rounded active:bg-gray-50
                                                                          hover:bg-gray-50  border border-primary '>
                            <Googleplay fill='currentColor' className=' w-7 h-7  text-gray-50 group-hover:text-black  cursor-pointer transition-colors' />
                            <div className='text-white font-pop flex flex-col gap-1 leading-none'>
                                <span className='text-gray-50 text-[12px] group-hover:text-black '>Download on the</span>
                                <span className='font-semibold text-[14px] group-hover:text-black   text-gray-50 cursor-pointer'>Google Play</span>
                            </div>
                        </div>
                       <div className='flex gap-2 items-center py-3 px-3 group rounded active:bg-gray-50
                                                                          hover:bg-gray-50  border border-primary '>
                            <Appstore fill='currentColor' className=' w-7 h-7  text-gray-50 group-hover:text-black  cursor-pointer transition-colors' />
                            <div className='text-white font-pop flex flex-col gap-1 leading-none'>
                                <span className='text-gray-50 text-[12px] group-hover:text-black '>Download on the</span>
                                <span className='font-semibold text-[14px] group-hover:text-black   text-gray-50 cursor-pointer'>Apple Store</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MobileFooter

