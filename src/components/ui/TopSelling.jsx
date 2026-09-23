import React from 'react'
import Container from '@/components/layout/Container'
import { useFetchData } from '@/hooks/useFetchData'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare'
import { useCompare } from '@/features/compare/hooks/useCompare'
import { Link } from 'react-router'
import { useCart } from '@/features/cart/hooks/useCart';
import CardActions from '@/components/ui/CardActions';

const ProductCard = ({ data, loading = false, errs = '', type = '', discount, timers }) => {
    const addToCart = useAddToCart()
    const { data: cartData } = useCart()
    const { data: wishlistData } = useWishlist()
    const { data: compareData } = useCompare()
    const cartItem = cartData?.data?.items || []
    const wishListItem = wishlistData?.data || []
    const compareListItem = compareData?.data || []
    const addToWishlist = useUpdateWishlist()
    const addToCompare = useUpdateCompare()

    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }
    const handleWishlist = async (id) => {
        await addToWishlist.mutateAsync({ productId: id })
    }
    const handleCompare = async (id) => {
        await addToCompare.mutateAsync({ productId: id })
    }
    const isInCart = (proId) => {
        return cartItem?.some((item) => item?.product?._id === proId)
    }
    const isInWishlist = (proId) => {
        return wishListItem.some((item) => item?._id === proId)
    }
    const isInCompare = (proId) => {
        return compareListItem.some((item) => item?._id === proId)
    }
    if (loading) return <p className='text-center p-10 text-gray-500 dark:text-gray-400 font-inter'>Loading items...</p>
    if (errs) return <p className='text-center p-10 text-red-500 font-inter'>{errs}</p>
    const { days, hours, minutes, seconds } = timers
    return (
        <div className='bg-[#F4F4F4] dark:bg-[#181818]'>
            <Container >
                <div className='flex pt-12 pb-6 z-50'>
                    <div className='w-full'>
                        <div className={`border-b border-b-gray-300 dark:border-b-[#333333] mb-5 relative }`}>
                            <h1 className='sectionHeading w-70 border-b-[2px] select-none border-b-primary pb-3'>{data?.title}</h1>
                        </div>
                        <div className='flex flex-col lg:flex-row pb-3 gap-1'>
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-0 gap-x-1 lg:w-[60%]'>
                                {data?.products && data.products.slice(0, 6).map((pro, index) => (
                                    <div
                                        data-touch-hover
                                        className={`relative cardSurface py-3 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-r border-r-gray-300 dark:border-r-[#333333] mb-2 cursor-pointer`}
                                    >
                                        <div className='px-5'>
                                            <div className='flex items-center pt-1'>
                                                {pro?.categories?.map((tag, index) => (
                                                    <p key={index} className='truncate text-[12px] block text-gray-500 dark:text-gray-400 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold'>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                ))}
                                            </div>
                                            <div className='min-h-12'>
                                                {pro.name &&
                                                    <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] dark:text-blue-400 text-[16px] leading-tight pt-1 font-semibold line-clamp-2 cursor-pointer'>{pro.name}</Link>
                                                }
                                            </div>
                                            {pro.image &&
                                                <Link to={`/products/${pro.slug || pro._id}`} className='flex justify-center'>
                                                    <img loading="lazy" src={pro.image} alt={pro.name} className='imageTile md:w-42 w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105 touchScale cursor-pointer' />
                                                </Link>
                                            }
                                            <div className='flex items-center justify-between pb-3'>
                                                {pro.price &&
                                                    <p className='text-tcolor dark:text-gray-100 text-[20px]'>${pro.price}</p>
                                                }
                                                <div className='group relative mr-2'>
                                                    {isInCart(pro._id) ?
                                                        <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary'>
                                                            <ArrowBigRight size={25} className='text-white' />
                                                        </Link>
                                                        :
                                                        <div className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary group relative' onClick={() => handleCart(pro._id)}>
                                                            <FaOpencart size={25} className='text-white' />
                                                        </div>
                                                    }
                                                    <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`} />
                                                </div>
                                            </div>
                                            <CardActions
                                                productId={pro._id}
                                                inWishlist={isInWishlist(pro._id)}
                                                inCompare={isInCompare(pro._id)}
                                                onWishlist={handleWishlist}
                                                onCompare={handleCompare}
                                                className='border-t border-gray-200 py-1 dark:border-[#333333]'
                                                accent='before:right-5 before:w-47 lg:before:w-35 xl:before:w-57 before:border-gray-200'
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='lg:w-[40%] bg-white dark:bg-[#262626] border-3 rounded-xl border-primary mb-2 py-5 px-10'>
                                {discount?.products?.slice(2, 3).map((pro, index) => (                                                        <Link key={pro._id} to={`/products/${pro.slug || pro._id}`} className='block'>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-inter text-tcolor dark:text-gray-100 text-[22px]'>Special Offer</p>
                                            <div className='font-inter flex flex-col justify-center items-center border rounded-full border-transparent p-3 bg-primary'>
                                                <p className='text-[12px] text-tcolor dark:text-gray-100'>Save</p>
                                                <span className='text-[#000000] text-[20px] font-bold'>${(pro.regularPrice - pro.salePrice).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center cursor-pointer'>
                                            <img src={pro.image} alt={pro.name} className='w-75 h-auto' />
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-4'>
                                            <p className='text-[#0062BD] dark:text-blue-400 text-[16px] leading-tight pt-1 font-semibold line-clamp-2 text-center'>{pro.name}</p>
                                            <div className='font-inter'>
                                                <span className='text-[#DC3545] text-[30px]'>${(pro.salePrice).toFixed(2)}</span>
                                                <span className='line-through text-[18px] text-gray-500 dark:text-gray-400 pl-2'>${(pro.regularPrice).toFixed(2)}</span>
                                            </div>
                                            <div className='flex flex-col justify-center items-center gap-3'>
                                                <span className='text-gray-600 dark:text-gray-300'>Hurry Up! Offer ens in:</span>
                                                {/* timer starts from here */}
                                                <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 font-inter flex-wrap sm:flex-nowrap md:mb-7 lg:mb-2">

                                                    {/* Days */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-[#333333] rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor dark:text-gray-100">
                                                                {String(days).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor dark:text-gray-100">
                                                            Days
                                                        </span>
                                                    </div>

                                                    <span className="pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200">
                                                        :
                                                    </span>

                                                    {/* Hours */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-[#333333] rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor dark:text-gray-100">
                                                                {String(hours).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor dark:text-gray-100">
                                                            Hours
                                                        </span>
                                                    </div>

                                                    <span className="pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200">
                                                        :
                                                    </span>

                                                    {/* Minutes */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-[#333333] rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor dark:text-gray-100">
                                                                {String(minutes).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor dark:text-gray-100">
                                                            Minutes
                                                        </span>
                                                    </div>

                                                    <span className="pt-1 text-lg sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200">
                                                        :
                                                    </span>

                                                    {/* Seconds */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-[#333333] rounded-lg flex items-center justify-center">
                                                            <span className="text-lg sm:text-2xl md:text-[30px] text-tcolor dark:text-gray-100">
                                                                {String(seconds).padStart(2, "0")}
                                                            </span>
                                                        </div>
                                                        <span className="mt-1 text-[10px] sm:text-xs md:text-sm font-semibold text-tcolor dark:text-gray-100">
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
