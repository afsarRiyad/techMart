import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaOpencart } from "react-icons/fa6";
import {  GitCompareArrows, Heart  } from 'lucide-react';
import Container from './layouts/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useFetchData } from '../hooks/Fetchdata';
import Tooltip from './ui/Tooltip';
import { useAddToCart } from '../features/Cart/hooks/useAddToCart';
import { useUpdateWishlist } from '../features/wishlist/hooks/useUpdateWishlist';
import { useCart } from './../features/Cart/hooks/useCart.js';
import { ArrowBigRight } from 'lucide-react';
import { Link } from 'react-router';
import { useWishlist } from '../features/Wishlist/hooks/useWishlist.js';

const Featured = () => {
  const addToCart = useAddToCart()
  const {data} = useCart()
  const {data: wishlistData} = useWishlist()
  const cartItem = data?.data?.items || []
  const wishListItem = wishlistData?.data || []
  console.log(wishListItem);
  
  const addToWishlist = useUpdateWishlist()
    const [show, setShow]= useState('on-sale')
    const {data:sections, loading, errs:errors} = useFetchData('/api/home-v3')
    const handleCart =async  (productId) => {
                       await  addToCart.mutateAsync({
                          product: productId,
                          quantity: 1,
                        });
                      }
    const hadleWishlist = async(id)=>{
         await addToWishlist.mutateAsync({
                    productId : id
         })
    }
    const isInCart = (proId)=>{
      return cartItem?.some((item)=> item?.product?._id === proId )
    }
    const isInWishlist = (proId)=>{
      return wishListItem.some((item)=> item?._id === proId)
    }
    let datas = sections?.data?.sections.filter(item => (
      ['featured-products', 'on-sale', 'top-selling'].includes(item.id)
    )) || [];
    const currentSection = datas?.find(sec => show === sec.id)
    if (loading) return <p className="text-center p-10 text-gray-500 font-inter">Loading items...</p>
    if (errors) return <p className="text-center p-10 text-red-500 font-inter">{errors}</p>
  return (
    <Container  className='font-inter dark:text-white'>
        <div className='flex justify-center items-center gap-5 font-inter text-[18px] text-[#333E48] pt-6 pb-2 border-b border-b-gray-200 mb-8'>
        <span onClick={()=>setShow('featured-products')} className={`${show === 'featured-products' && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>Featured</span>
        <span onClick={()=>setShow('on-sale')} className={`${show === 'on-sale' && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>On Sale  </span>
        <span onClick={()=>setShow('top-selling')} className={`${show === 'top-selling' && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>Top Rated</span>
    </div>
        {currentSection && (
                <Swiper
                   modules={[Pagination]}
                  pagination={{ dynamicBullets: true, clickable: true }}
                 breakpoints={{
                           320: {
                             slidesPerView: 2,
                               spaceBetween: 0,
                             },
                             768: {
                               slidesPerView: 4,
                               spaceBetween: 0,
                             },
                             1280: {
                               slidesPerView: 6,
                               spaceBetween: 0,
                             },
                           }}
                           className="pb-5"
                 >
                {currentSection?.products && currentSection.products.slice(0,6).map((pro, index) =>(
                 <SwiperSlide key={pro.id} className='pb-6 '>
                    <div key={pro.id} className={`relative  ${index !== currentSection.products.length - 1 ? "after:content-[''] after:absolute after:right-0 after:top-5 after:h-[75%] after:w-[1px] after:bg-gray-200 "
          : ""
      }  px-4 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] py-2`}>
                        <div className='flex flex-wrap items-center line-clamp-2 min-h-[35px] '>
                            {pro.categories?.slice(0,2).map((tag, index)=>(
                            <p key={tag} className='text-[12px] pr-1 block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}
                             {index < pro.categories.length - 1 && ','}
                            </p>
                        ))}
                        </div>
                        <p className='text-[#0062BD] text-[16px] leading-tight min-h-[45px] pt-1 line-clamp-2 font-semibold'>{pro.name}</p>
                      <div className='h-50 flex items-center justify-center overflow-hidden'>
                        <img loading="lazy" src={pro.image} alt="" className='max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105' />
                      </div>
                     <div className='flex justify-between items-center pb-2'>
                        <div className='flex justify-center items-center md:gap-2'>
                          <p className='pt-3 text-tcolor text-[20px] '>${pro.regularPrice}</p>
                        {pro.salePrice && <p className='pt-3 text-gray-500 text-[14px] line-through'>${pro.salePrice}</p>}
                        </div>
                        <div className='group relative'>
                        {isInCart(pro._id) ? 
                          <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center  cursor-pointer group-hover/card:bg-primary'>
                            <ArrowBigRight size={25} className='text-white'/>
                        </Link>
                          :
                        <button onClick={()=>handleCart(pro._id)} disabled={addToCart.isPending} className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center  cursor-pointer group-hover/card:bg-primary'>
                            <FaOpencart size={25} className='text-white' />
                        </button>
                          }
                     {/* tooltip  */}
                        <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`}/>
                    {/* tooltip ends here  */}
                    </div>
                     </div>
                     <div className={` justify-between text-[12px] text-gray-500 pt-3 border-t border-t-gray-200 pb-1 opacity-0 group-hover/card:opacity-100 ${isInWishlist(pro._id) ? 'flex-row ': 'flex '}`}>
                        <div className='flex items-center gap-1 cursor-pointer hover:text-black'>
                           {isInWishlist(pro._id) ? 
                            <>
                            <Heart className='text-black' fill="currentColor"/>
                             <Link to='/wishlist'>Added to Wishlist</Link>
                            </>
                            :
                            <>
                            <Heart />
                             <button onClick={()=>hadleWishlist(pro._id)}>Wishlist</button>
                            </>
                           }
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer hover:text-black'>
                             <GitCompareArrows/>
                            <span>Compare</span>
                        </div>
                     </div>
                    </div>
                </SwiperSlide>
                ))}
              </Swiper>
  ) }
    </Container>
  )
}

export default Featured
