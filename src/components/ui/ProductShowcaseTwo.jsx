// Renamed from ProShocaseTwo.jsx (typo fix).
import React from 'react'
import background from '@/assets/images/ProductBackground.webp'
import Container from '@/components/layout/Container'
import { useFetchData } from '@/hooks/useFetchData'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight, GitCompareArrows, Heart } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/grid";
import 'swiper/css/pagination';
import { Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart';
import { Link } from 'react-router';
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare';
import { useCompare } from '@/features/compare/hooks/useCompare';
import useTouchReveal from '@/hooks/useTouchReveal';

const ProductShowcaseTwo = ({data, loading=false, errs='', type=''}) => {
    const addtoWishlist = useUpdateWishlist()
    const addToCompare = useUpdateCompare()
    const {data: cartData} = useCart()
    const addToCart = useAddToCart()
        const {data: wishlistData} = useWishlist()
    const {data: compareData} = useCompare()
    // touch screens get no hover, a tap opens the wishlist/compare row
    const { openId, reveal, blockOpeningTap } = useTouchReveal()
    const handleWishlist = (id) =>{
           addtoWishlist.mutate({
                     productId : id
           })
    }
    const handleCompare = (id) => {
           addToCompare.mutate({ productId: id })
    }
        const cartItem = cartData?.data?.items || [];
       const wishListItem = wishlistData?.data || [];
       const compareListItem = compareData?.data || [];
    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }
        const isInCart = (proId) =>{
        return cartItem.some((item)=> item?.product?._id === proId)
    }
    const isInWishlist = (proId) => {
  return wishListItem.some((item) => item._id === proId);
    }
    const isInCompare = (proId) => {
  return compareListItem.some((item) => item._id === proId);
    }
     if (loading) return <p className='text-center p-10 text-gray-500 font-inter'>Loading items...</p>
        if (errs) return <p className='text-center p-10 text-red-500 font-inter'>{errs}</p>
  return (
       <Container>
                <div className='flex py-2 z-50 pt-8'>
                    <div className=' w-full '>
                        <div className={`border-b border-b-gray-300 mb-5 relative  }`}>
                            <h1 className='font-inter text-[22px] text-tcolor w-70 border-b-[2px] select-none border-b-primary pb-3'>{data?.title}</h1>
                            <ChevronLeft size={30} className={`absolute top-1 text-gray-500 cursor-pointer right-8 prev-${type} disabled:opacity-50 `} />
                            <ChevronRight size={30} className={`absolute top-1 text-gray-500 cursor-pointer right-2 next-${type} prev-2 disabled:opacity-50 `} />
                        </div>
                        <Swiper
                            modules={[  Navigation]}
                            pagination={{ dynamicBullets: true, clickable: true }}
                            navigation={{
                                prevEl: `.prev-${type}` ,
                                nextEl: `.next-${type}`,
                            }}
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
                            className="lg:!pb-14 !pt-3"
                        >
                            {data?.products && data.products.map((pro, index) => (
                                <SwiperSlide key={index} className='hover:z-30 '>
                                    <div
                                        onTouchStart={() => reveal(pro._id)}
                                        onClickCapture={blockOpeningTap}
                                        className={`relative  py-3 bg-white   group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-r border-r-gray-300 mb-2 pointer-coarse:mb-16 cursor-pointer `}
                                    >
                                            <div className=' px-5 '>
                                                <div className='flex items-center pt-1'>
                                                    {pro?.categories?.map((tag, index) => (
                                                        <p key={index} className='truncate text-[12px] block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                    ))}
                                                </div>
                                                {pro.name &&
                                                    <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] text-[16px] min-h-12 leading-tight pt-2 font-semibold line-clamp-2 cursor-pointer'>{pro.name}</Link>
                                                }
                                                 {pro.image &&
                                                    <Link to={`/products/${pro.slug || pro._id}`}>
                                                        <img loading="lazy" src={pro.image} alt={pro.name} className='md:w-full w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105 cursor-pointer' />
                                                    </Link>
                                        }
                                                <div className='flex items-center justify-between pb-3'>
                                                    {pro.price &&
                                                        <p className=' text-tcolor text-[20px] '>${pro.price}</p>
                                                    }
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
                                                {/* Hover wishlist and compare  */}
                                                <div onClick={()=>handleWishlist(pro._id)} className={`absolute left-0  justify-center right-0 bottom-4 translate-y-full  bg-white  p-3  ${openId === pro._id ? 'opacity-100 visible' : 'opacity-0 invisible'} group-hover/card:opacity-100  group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-5  before:w-47 lg:before:w-40 before:border-t-2 before:border-gray-200 before:content-[""]`}>
                                                    <div className={ `flex items-center gap-1 justify-center cursor-pointer hover:text-black text-gray-500 `}>
                                                       {isInWishlist(pro._id) ? 
                                                        <>
                                                        <Heart className='text-black' fill="currentColor"/>
                                                        <Link to='/wishlist'>Added to Wishlist</Link>
                                                        </>
                                                        :
                                                        <>
                                                       <button onClick={()=>handleWishlist(pro._id)} className='flex items-center gap-2'>
                                                         <Heart size={18}/>
                                                        <span className='text-sm' >Wishlist</span>
                                                       </button>
                                                        </>
                                                        }
                                                    </div>
                                                    <div className='flex items-center gap-1 mt-2  justify-center  cursor-pointer hover:text-black text-gray-500 pb-1 '>
                                                        {isInCompare(pro._id) ?
                                                            <>
                                                                <GitCompareArrows size={18} className='text-black' />
                                                                <Link to='/compare'>Added to Compare</Link>
                                                            </>
                                                            :
                                                            <button onClick={() => handleCompare(pro._id)} className='flex items-center gap-2'>
                                                                <GitCompareArrows size={18}/>
                                                                <span className='text-sm '>Compare</span>
                                                            </button>
                                                        }
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

export default ProductShowcaseTwo
