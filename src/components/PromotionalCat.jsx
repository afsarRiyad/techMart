import React from 'react'
import background from '../assets/images/ProductBackground.webp'
import Container from './layouts/Container'
import { useFetchData } from '../hooks/Fetchdata'
import television from '../assets/images/television.webp'
import { FaOpencart } from "react-icons/fa6";
import { GitCompareArrows, Heart } from 'lucide-react';
import Tooltip from './ui/Tooltip'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/grid";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Grid, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const PromotionalCat = () => {
    const { data: sec, loading, errs } = useFetchData('/api/home-v3')
    const section = sec?.data?.sections?.find(cat => cat.id === 'television-and-entertainment')
    console.log(section);
    if (loading) return <p className='text-center p-10 text-gray-500 font-inter'>Loading items...</p>
    if (errs) return <p className='text-center p-10 text-gray-500 font-inter'>Error occurred while loading items.</p>
    return (
        <div className='object-cover w-full min-h-[554px]  my-5 ' style={{ backgroundImage: `url(${background})` }}>
            <Container>
                <div className='flex py-15 z-50 '>
                    <div className='w-[50%] hidden md:flex justify-center items-center '>
                        <img src={television} alt="Television" className='w-130 h-auto flex justify-center items-center' />
                    </div>
                    <div className='md:w-[50%] w-full'>
                        <div className='border-b border-b-gray-300 mb-5 relative'>
                            <h1 className='font-inter text-[22px] text-tcolor w-70 border-b-[2px] select-none border-b-primary pb-3'>{section?.title}</h1>
                            <ChevronLeft size={30} className='absolute top-1 text-gray-500 cursor-pointer right-8 prev-l disabled:opacity-50' />
                            <ChevronRight size={30} className='absolute top-1 text-gray-500 cursor-pointer right-2 prev-r disabled:opacity-50' />
                        </div>
                        <Swiper
                            modules={[Grid, Pagination, Navigation]}
                            pagination={{ dynamicBullets: true, clickable: true }}
                            grid={{
                                rows: 3,
                                fill: "row",
                            }}
                            navigation={{
                                prevEl: ".prev-l",
                                nextEl: ".prev-r",
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    grid: {
                                        rows: 2,
                                    },
                                },
                                1280: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                    grid: {
                                        rows: 2,
                                    },
                                },
                            }}
                            className="!pb-16 !pt-3"
                        >
                            {section?.products && section.products.map((pro, index) => (
                                <SwiperSlide key={index} >
                                    <div className='relative flex py-3 bg-white mr-1 mb-2 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] '>
                                        {pro.image &&
                                            <div className='w-[40%] h-full flex items-center'>
                                                <img src={pro.image} className=' object-cover pl-1 ' />
                                            </div>
                                        }
                                        <div>
                                            <div className='xl:px-2 px-1'>
                                                <div className='flex items-center pt-1'>
                                                    {pro?.categories?.map((tag, index) => (
                                                        <p key={index} className='truncate text-[12px] pr-1 block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                    ))}
                                                </div>
                                                {pro.name &&
                                                    <span className='text-[#0062BD] text-[16px] leading-tight min-h-[45px] pt-2  font-semibold line-clamp-2'>{pro.name}</span>
                                                }
                                                <div className='flex items-center justify-between py-3'>
                                                    {pro.price &&
                                                        <p className=' text-tcolor text-[20px] '>${pro.price}</p>
                                                    }
                                                    <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center  cursor-pointer group-hover/card:bg-primary group relative mr-6'>
                                                        <FaOpencart size={25} className='text-white' />
                                                        <Tooltip title='Add to Cart' />
                                                    </div>
                                                </div>
                                                {/* Hover wishlist and compare  */}
                                                <div className='absolute left-0 right-0 bottom-4 translate-y-full  bg-white  p-3  opacity-0 invisible group-hover/card:opacity-100  group-hover/card:visible z-20 shadow-[0_8px_16px_rgba(0,0,0,0.15)] before:absolute before:top-0 before:right-1 before:w-48 before:border-t-2 before:border-primary before:content-[""]'>
                                                    <div className='flex items-center gap-1 mr-10 justify-end cursor-pointer hover:text-black text-gray-500'>
                                                        <Heart size={18} />
                                                        <span className='text-sm pl-2'>Wishlist</span>
                                                    </div>
                                                    <div className='flex items-center gap-1 mt-2 mr-10 justify-end  cursor-pointer hover:text-black text-gray-500 pb-1'>
                                                        <GitCompareArrows size={18}/>
                                                        <span className='text-sm '>Compare</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PromotionalCat
