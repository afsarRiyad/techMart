import React from 'react'
import Container from './../layouts/Container';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';
import Facebook from '../../assets/iconsSocial/facebook.svg?react';
import Twitter from '../../assets/iconsSocial/twitter.svg?react';
import Instagram from '../../assets/iconsSocial/instagram.svg?react';
import Pinterest from '../../assets/iconsSocial/pinterest.svg?react';
import Whatsap from '../../assets/iconsSocial/whatsap.svg?react';
import Youtube from '../../assets/iconsSocial/youtube.svg?react';
import Linkedin from '../../assets/iconsSocial/linkedin.svg?react';
import Rss from '../../assets/iconsSocial/rss.svg?react';
import Appstore from '../../assets/iconsStore/appstore.svg?react';
import Googleplay from '../../assets/iconsStore/googleplay.svg?react';



const Footer = () => {
    return (
        <div className='bg-[#F8F8F8] hidden sm:block'>
            <Container>
                <div className='flex pt-8  w-full gap-5'>
                    <div className='flex flex-col gap-6 w-[322px]'>
                        <span className='font-inter text-[18px] font-semibold text-tcolor tracking-widest'>
                            SUPPORT
                        </span>
                        <div className='flex flex-col gap-5'>
                            <Link to='tel:16793' className=' rounded-full w-[245px] h-18 flex gap-10 items-center border border-gray-200 hover:border-primary '>
                                <Phone size={23} className='ml-6 ' strokeWidth={1.5} />
                                <div className='relative w-40 after:absolute after:content-[""] after:h-10 after:w-[1px] after:top-1 after:-left-7 after:bg-gray-300 flex flex-col cursor-pointer'>
                                    <span className='text-[14px] text-gray-500'>9 AM - 8 PM</span>
                                    <span className='font-bold text-[20px] text-tcolor '>16793</span>
                                </div>
                            </Link>
                            <Link to='mailto:electromart@gmail.com' className=' rounded-full w-[245px] truncate h-18 flex gap-10 items-center border border-gray-200 hover:border-primary '>
                                <Mail size={23} className='ml-6 ' />
                                <div className='relative w-40 after:absolute after:content-[""] after:h-10 after:w-[1px] after:top-1 after:-left-7 after:bg-gray-300 flex flex-col cursor-pointer'>
                                    <span className='text-[14px] text-gray-500'>Contact via mail</span>
                                    <span className='font-bold text-[18px] text-tcolor  truncate'>electromart@gmail.com</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-[645px]'>
                        <span className='font-inter text-[18px] font-semibold text-tcolor tracking-widest'>
                            ABOUT US
                        </span>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3'>
                            <li className='footerLi'><Link to='#' className='footerLink'>Affiliate Program</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Online Delivery</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Refund and Return Policy</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Blog</Link></li>

                            <li className='footerLi'><Link to='#' className='footerLink'>EMI Terms</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Privacy Policy</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Star Point Policy</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Contact Us</Link></li>

                            <li className='footerLi'><Link to='#' className='footerLink'>About Us</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Terms and Conditions</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Career</Link></li>
                            <li className='footerLi'><Link to='#' className='footerLink'>Brands</Link></li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-6 w-[322px]'>
                        <span className='font-inter text-[18px] font-semibold text-tcolor tracking-widest'>
                            STAY CONNECTED
                        </span>
                        <div>
                            <div className='flex flex-col gap-1 pb-1'>
                                <span className='font-semibold text-[16px] leading-7'>Electro Tech Ltd</span>
                                <span className='font-inter text-tcolor pr-8'>Head Office: 28 roadd fslkd lksdjfl lskdf lskdf lksdjfl sf, Dhaka 1000</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-gray-500 font-semibold'>
                                    Email:
                                </span>
                                <Link to='#' className='text-gray-500 relative after:absolute after:content-[""] after:w-30 after:h-[2px] after:bg-primary  after:text-white  after:-bottom-1 after:left-0'>websitsdfk@gmail.com</Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-between py-4'>
                    <div className='flex gap-4'>
                        <Facebook className='cursor-pointer text-blue-500 w-6 h-auto footerSocial' fill='currentColor' />
                        <Twitter className='cursor-pointer text-black w-6 h-auto footerSocial' fill='currentColor' />
                        <Instagram className='cursor-pointer text-pink-500 w-6 h-auto footerSocial' fill='currentColor' />
                        <Pinterest className='cursor-pointer text-red-600 w-6 h-auto footerSocial' fill='currentColor' />
                        <Whatsap className='cursor-pointer text-green-500 w-9 h-auto footerSocial' fill='currentColor' />
                        <Youtube className='cursor-pointer text-red-500 w-9 h-auto footerSocial' fill='currentColor' />
                        <Linkedin className='cursor-pointer text-blue-500 w-9 h-auto footerSocial' fill='currentColor' />
                        <Rss className='cursor-pointer text-orange-500 w-9 h-auto footerSocial' fill='currentColor' />
                    </div>
                    <div className='flex text-[14px] leading-7 font-inter text-gray-500 items-center gap-4'>
                        <span className='sm:hidden lg:flex '>Experience App on your mobile:
                        </span>
                        <div className='flex gap-2'>
                            <div className='flex gap-2 items-center py-1 px-2 rounded active:bg-gray-200
                                                          hover:bg-gray-100 border border-gray-200 '>
                                <Googleplay fill='currentColor' className='text-tcolor w-7 h-7 cursor-pointer transition-colors' />
                                <div className='text-white font-pop flex flex-col gap-1 leading-none'>
                                    <span className='text-gray-500 text-[12px] '>Download on the</span>
                                    <span className='font-semibold text-[14px]  text-tcolor cursor-pointer'>Google Play</span>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center py-1 px-2 rounded active:bg-gray-200
                                                          hover:bg-gray-100 border border-gray-200 '>
                                <Appstore fill='currentColor' className='text-tcolor w-7 h-7 cursor-pointer transition-colors' />
                                <div className='text-white font-pop flex flex-col gap-1 leading-none'>
                                    <span className='text-gray-500 text-[12px] '>Download on the</span>
                                    <span className='font-semibold text-[14px]  text-tcolor cursor-pointer'>App Store</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default Footer