import React from 'react'
import background from '../../assets/images/ProductBackground.webp'
import Container from '../layouts/Container'
import { useFetchData } from '../../hooks/Fetchdata'
import { FaOpencart } from "react-icons/fa6";
import { GitCompareArrows, Heart, ArrowBigRight } from 'lucide-react';
import Tooltip from './Tooltip'
import { useAddToCart } from '../../features/Cart/hooks/useAddToCart'
import { useUpdateWishlist } from '../../features/wishlist/hooks/useUpdateWishlist'
import { useWishlist } from '../../features/wishlist/hooks/useWishlist'
import { Link } from 'react-router'
import { useCart } from '../../features/Cart/hooks/useCart.js';

const ProductCard = ({ data, loading = false, errs = '', type = '', discount, timers }) => {
    const addToCart = useAddToCart()
    const { data: cartData } = useCart()
    const { data: wishlistData } = useWishlist()
    const cartItem = cartData?.data?.items || []
    const wishListItem = wishlistData?.data || []
    const addToWishlist = useUpdateWishlist()

    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }
    const handleWishlist = async (id) => {
        await addToWishlist.mutateAsync({ productId: id })
    }
    const isInCart = (proId) => {
        return cartItem?.some((item) => item?.product?._id === proId)
    }
    const isInWishlist = (proId) => {
        return wishListItem.some((item) => item?._id === proId)
    }
    if (loading) return <p className='text-center p-10 text-gray-500 font-inter'>Loading items...</p>
    if (errs) return <p className='text-center p-10 text-red-500 font-inter'>{errs}</p>
    const { days, hours, minutes, seconds } = timers
    return (
        <div className='bg-[#F4F4F4]'>
            <Container >
                <div className='flex pt-12 pb-6 z-50 '>
                    <div className=' w-full '>
                        <div className={`border-b border-b-gray-300 mb-5 relative  }`}>
                            <h1 className='font-inter text-[22px] text-tcolor w-70 border-b-[2px] select-none border-b-primary pb-3'>{data?.title}</h1>
                        </div>
                        <div className='flex flex-col lg:flex-row pb-3 gap-1'>
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-0 gap-x-1 lg:w-[60%]'>
                                {data?.products && data.products.slice(0, 6).map((pro, index) => (
                                    <div className={`relative  py-3 bg-white   group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-r border-r-gray-300 mb-2 cursor-pointer `}>
                                        <div className=' px-5 '>
                                            <div className='flex items-center pt-1'>
                                                {pro?.categories?.map((tag, index) => (
                                                    <p key={index} className='truncate text-[12px] block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                ))}
                                            </div>
                                            <div className='min-h-12'>
                                                {pro.name &&
                                                    <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] text-[16px] leading-tight pt-1 font-semibold line-clamp-2 cursor-pointer'>{pro.name}</Link>
                                                }
                                            </div>
                                            {pro.image &&
                                                <Link to={`/products/${pro.slug || pro._id}`}>
                                                    <img loading="lazy" src={pro.image} alt={pro.name} className='md:w-42 w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105 cursor-pointer' />
                                                </Link>
                                            }
                                            <div className='flex items-center justify-between pb-3'>
                                                {pro.price &&
                                                    <p className=' text-tcolor text-[20px] '>${pro.price}</p>
                                                }
                                                <div className='group relative mr-2'>
                                                    {isInCart(pro._id) ?
                                                        <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary'>
                                                            <ArrowBigRight size={25} className='text-white' />
                                                        </Link>
                                                        :
                                                        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary group relative' onClick={() => handleCart(pro._id)}>
                                                            <FaOpencart size={25} className='text-white' />
                                                        </div>
                                                    }
                                                    <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`} />
                                                </div>
                                            </div>
                                            {/* Hover wishlist and compare  */}
                                            <div className={`absolute left-0 flex gap-4 items-center justify-center right-0 bottom-4 translate-y-full  bg-white  p-3  opacity-0 invisible group-hover/card:opacity-100  group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-5  before:w-47 lg:before:w-35 xl:before:w-57 before:border-t-2 before:border-gray-200 before:content-[""]`}>
                                                <div className='flex items-center gap-1 justify-end cursor-pointer hover:text-black text-gray-500 pb-2 pt-1'>
                                                    {isInWishlist(pro._id) ?
                                                        <>
                                                            <Heart className='text-black' fill="currentColor" />
                                                            <Link to='/wishlist' className='text-[14px]'>Added to Wishlist</Link>
                                                        </>
                                                        :
                                                        <>
                                                            <button onClick={() => handleWishlist(pro._id)} className='flex items-center gap-2'>
                                                                <Heart size={18} />
                                                                <span className='text-sm' >Wishlist</span>
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                                <div className='flex items-center gap-1 justify-end  cursor-pointer pt-1 hover:text-black text-gray-500 pb-2'>
                                                    <GitCompareArrows size={18} />
                                                    <span className='text-sm '>Compare</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='lg:w-[40%] bg-white border-3 rounded-xl border-primary mb-2 py-5 px-10 '>
                                {discount?.products?.slice(2, 3).map((pro, index) => (
                                    <Link to={`/products/${pro.slug || pro._id}`} className='block'>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-inter text-tcolor text-[22px]'>Special Offer</p>
                                            <div className='font-inter flex flex-col justify-center items-center border rounded-full border-transparent p-3 bg-primary'>
                                                <p className='text-[12px] text-tcolor'>Save</p>
                                                <span className='text-[#000000] text-[20px] font-bold'>${(pro.regularPrice - pro.salePrice).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center cursor-pointer'>
                                            <img src={pro.image} alt={pro.name} className='w-75 h-auto' />
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-4'>
                                            <p className='text-[#0062BD] text-[16px] leading-tight pt-1 font-semibold line-clamp-2 text-center'>{pro.name}</p>
                                            <div className=' font-inter'>
                                                <span className='text-[#DC3545] text-[30px]'>${(pro.salePrice).toFixed(2)}</span>
                                                <span className='line-through text-[18px] text-gray-500 pl-2'>${(pro.regularPrice).toFixed(2)}</span>
                                            </div>
                                            <div className='flex flex-col justify-center items-center gap-3'>
                                                <span className='text-gray-600'>Hurry Up! Offer ens in:</span>
                                                {/* timer starts from here */}
                                                <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 font-inter flex-wrap sm:flex-nowrap md:mb-7 lg:mb-2">

                                                    {/* Days */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor">
                                                                {String(days).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor">
                                                            Days
                                                        </span>
                                                    </div>

                                                    <span className="pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700">
                                                        :
                                                    </span>

                                                    {/* Hours */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor">
                                                                {String(hours).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor">
                                                            Hours
                                                        </span>
                                                    </div>

                                                    <span className="pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700">
                                                        :
                                                    </span>

                                                    {/* Minutes */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor">
                                                                {String(minutes).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor">
                                                            Minutes
                                                        </span>
                                                    </div>

                                                    <span className=" pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700">
                                                        :
                                                    </span>

                                                    {/* Seconds */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor">
                                                                {String(seconds).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor">
                                                            Secs
                                                        </span>
                                                    </div>

                                                </div>
                                                {/* timers ends here */}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProductCard
