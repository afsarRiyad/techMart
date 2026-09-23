import React from 'react'
import background from '@/assets/images/ProductBackground.webp'
import Container from '@/components/layout/Container'
import { useFetchData } from '@/hooks/useFetchData'
import television from '@/assets/images/television.webp'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/grid";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Grid, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist'
import { Link } from 'react-router'
import { useCart } from '@/features/cart/hooks/useCart'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare'
import { useCompare } from '@/features/compare/hooks/useCompare'
import CardActions from '@/components/ui/CardActions'
import { useTheme } from '@/features/theme/ThemeProvider'

const PromotionalCat = () => {
    const { isDark } = useTheme()
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
    const { data: sec, loading, errs } = useFetchData('/api/home-v3')
    const section = sec?.data?.sections?.find(cat => cat.id === 'television-and-entertainment')
    if (loading) return <p className='text-center p-10 text-gray-500 dark:text-gray-400 font-inter'>Loading items...</p>
    if (errs) return <p className='text-center p-10 text-red-500 font-inter'>{errs}</p>
    // the texture photo only makes sense on a light page; dark mode gets a flat
    // surface instead of a photo the dark theme would have to fight with
    return (
        <div
            className='object-cover w-full min-h-[554px] my-5 bg-white dark:bg-[#181818]'
            style={isDark ? undefined : { backgroundImage: `url(${background})` }}
        >
            <Container>
                <div className='flex py-15 z-50'>
                    <div className='w-[50%] hidden md:flex justify-center items-center'>
                        <img src={television} alt="Television" className='w-130 h-auto flex justify-center items-center' />
                    </div>
                    <div className='md:w-[50%] w-full'>
                        <div className='border-b border-b-gray-300 dark:border-b-[#333333] mb-5 relative'>
                            <h1 className='sectionHeading w-70 border-b-[2px] select-none border-b-primary pb-3'>{section?.title}</h1>
                            <ChevronLeft size={30} className='absolute top-1 text-gray-500 dark:text-gray-400 cursor-pointer right-8 prev-l disabled:opacity-50' />
                            <ChevronRight size={30} className='absolute top-1 text-gray-500 dark:text-gray-400 cursor-pointer right-2 prev-r disabled:opacity-50' />
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
                            className="pointer-fine:!pb-16 pointer-coarse:!pb-20 !pt-3"
                        >
                            {section?.products && section.products.map((pro, index) => (
                                <SwiperSlide key={index} >
                                    <div
                                        data-touch-hover
                                        className='relative flex py-3 cardSurface mr-1 mb-2 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]'
                                    >
                                        {pro.image &&
                                            <div className='w-[35%] h-full flex items-center'>
                                                <Link to={`/products/${pro.slug || pro._id}`}>
                                                    <img src={pro.image} alt={pro.name} className='imageTile object-contain pl-1 cursor-pointer mix-blend-multiply dark:mix-blend-normal' />
                                                </Link>
                                            </div>
                                        }
                                            <div className='xl:px-2 px-1 w-[65%]'>
                                                <div className='flex items-center pt-1'>
                                                    {pro?.categories?.map((tag, index) => (
                                                        <p key={index} className='truncate text-[12px] pr-1 block text-gray-500 dark:text-gray-400 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold'>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                    ))}
                                                </div>
                                                {pro.name &&
                                                    <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] dark:text-blue-400 text-[16px] leading-tight min-h-[45px] pt-2 font-semibold line-clamp-2 cursor-pointer'>{pro.name}</Link>
                                                }
                                                <div className='flex items-center justify-between py-3'>
                                                    {pro.price &&
                                                        <p className='text-tcolor dark:text-gray-100 text-[20px]'>${pro.price}</p>
                                                    }
                                                    <div className='group relative mr-6'>
                                                        {isInCart(pro._id) ?
                                                            <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary'>
                                                                <ArrowBigRight size={25} className='text-white' />
                                                                <Tooltip title='Go to Cart' />
                                                            </Link>
                                                        :
                                                            <div className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary group relative' onClick={() => handleCart(pro._id)}>
                                                                <FaOpencart size={25} className='text-white' />
                                                                <Tooltip title='Add to Cart' />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <CardActions
                                                    productId={pro._id}
                                                    inWishlist={isInWishlist(pro._id)}
                                                    inCompare={isInCompare(pro._id)}
                                                    onWishlist={handleWishlist}
                                                    onCompare={handleCompare}
                                                    align='end'
                                                    className='border-t border-gray-200 py-1 dark:border-[#333333]'
                                                    accent='before:right-1 before:w-48 before:border-primary'
                                                />
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
