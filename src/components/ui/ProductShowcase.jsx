import React from 'react'
import background from '../../assets/images/ProductBackground.webp'
import Container from '../layouts/Container'
import { useFetchData } from '../../hooks/Fetchdata'
import { FaOpencart } from "react-icons/fa6";
import { GitCompareArrows, Heart } from 'lucide-react';
import Tooltip from './Tooltip'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/grid";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Grid, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ProductShowcase = ({data, loading, errs, trending=false, type}) => {
        if (loading) return <p className='text-center p-10 text-gray-500 font-inter'>Loading items...</p>
        if (errs) return <p className='text-center p-10 text-red-500 font-inter'>{errs}</p>
  return (
       <Container>
                <div className='flex py-2 z-50 '>
                    <div className=' w-full '>
                        <div className='border-b border-b-gray-300 mb-5 relative'>
                            <h1 className='font-inter text-[22px] text-tcolor w-70 border-b-[2px] select-none border-b-primary pb-3'>{data?.title}</h1>
                            <ChevronLeft size={30} className={`absolute top-1 text-gray-500 cursor-pointer right-8 prev-${type} disabled:opacity-50`} />
                            <ChevronRight size={30} className={`absolute top-1 text-gray-500 cursor-pointer right-2 next-${type} prev-2 disabled:opacity-50`} />
                        </div>
                        <Swiper
                            modules={[Grid, Pagination, Navigation]}
                            pagination={{ dynamicBullets: true, clickable: true }}
                            grid={{
                                rows: 3,
                                fill: "row",
                            }}
                            navigation={{
                                prevEl: `.prev-${type}` ,
                                nextEl: `.next-${type}`,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                    grid: {
                                        rows: 3,
                                    },
                                },
                                1280: {
                                    slidesPerView: trending ? 4 : 3,
                                    spaceBetween: 0,
                                    grid: {
                                        rows:  trending ? 1 : 2,
                                    },
                                },
                            }}
                            className="lg:!pb-13 !pt-3"
                        >
                            {data?.products && data.products.map((pro, index) => (
                                <SwiperSlide key={index} className='hover:z-30 '>
                                    <div className={`relative flex py-3 bg-white  group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-b border-b-gray-300 md:border-b-0 md:border-r md:border-r-gray-300 ${trending ? 'mb-6' : 'mb-2'}`}>
                                        {pro.image &&
                                            <div className='w-[35%]'>
                                                <img src={pro.image} alt='img' className='  object-cover pl-2 ' />
                                            </div>
                                        }
                                            <div className=' px-5 w-[65%]'>
                                                <div className='flex items-center pt-1'>
                                                    {pro?.categories?.map((tag, index) => (
                                                        <p key={index} className='truncate text-[12px] block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                    ))}
                                                </div>
                                                {pro.name &&
                                                    <span className='text-[#0062BD] text-[16px]  leading-tight  pt-2  font-semibold line-clamp-2'>{pro.name}</span>
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
                                                <div className={`absolute left-0 ${!trending ? 'flex' : ''}  justify-end right-0 bottom-4 translate-y-full  bg-white  p-3  opacity-0 invisible group-hover/card:opacity-100  group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-1  ${trending ? 'before:w-40' : 'before:w-65'} before:border-t-2 before:border-primary before:content-[""]`}>
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
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </Container>

  )
}

export default ProductShowcase
