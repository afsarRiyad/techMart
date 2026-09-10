import React from 'react'
import Container from '@/components/layout/Container'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight, GitCompareArrows, Heart } from 'lucide-react';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart';
import { Link, useNavigate } from 'react-router';
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare';
import { useCompare } from '@/features/compare/hooks/useCompare';
import Tooltip from '@/components/ui/Tooltip';

// Tailwind can't detect dynamically-built class names (e.g. `grid-cols-${grid}`),
// so map the column count to full responsive class strings instead.
const GRID_CLASSES = {
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
}

const Gridview = ({ products , grid= 5}) => {
    const addtoWishlist = useUpdateWishlist()
    const addToCompare = useUpdateCompare()
    const { data: cartData } = useCart()
    const addToCart = useAddToCart()
    const { data: wishlistData } = useWishlist()
    const { data: compareData } = useCompare()
    const navigate = useNavigate()

    const handleWishlist = (id) => {
        addtoWishlist.mutate({
            productId: id
        })
    }
    const handleCompare = (id) => {
        addToCompare.mutate({
            productId: id
        })
    }
    const cartItem = cartData?.data?.items || [];
    const wishListItem = wishlistData?.data || [];
    const compareListItem = compareData?.data || [];

    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }

    const isInCart = (proId) => {
        return cartItem.some((item) => item?.product?._id === proId)
    }

    const isInWishlist = (proId) => {
        return wishListItem.some((item) => item._id === proId);
    }

    const isInCompare = (proId) => {
        return compareListItem.some((item) => item._id === proId);
    }

    const cols = Number(grid) || 5

    return (
        <div className='w-full min-w-0 font-inter'>
            <div className={`grid ${GRID_CLASSES[cols] || GRID_CLASSES[5]}`}>
                {products && products.map((pro, index) => (
                    <div key={pro._id || pro.id || index} className='group/card min-w-0 mb-5'>
                        <div
                            className={`relative py-3 bg-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]  mb-2 ${(index + 1) % cols === 0 ? 'border-none' : 'border-r border-r-gray-300'}`}
                        >
                            <div className='px-5'>
                                <div className='flex items-center pt-1'>
                                                    {pro?.categories?.map((tag, index) => (
                                                        <p key={index} className='truncate text-[12px] block text-gray-500 font-inter cursor-pointer hover:text-gray-900  '>{tag}{index < pro.categories.length - 1 && ','}</p>
                                                    ))}
                                                </div>
                                {pro.name &&
                                    <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] text-[16px] min-h-12 leading-tight pt-2 font-semibold line-clamp-2 cursor-pointer'>{pro.name}</Link>
                                }
                                {pro.image &&
                                <Link to={`/products/${pro.slug || pro._id}`}>
                                    <img loading="lazy" src={pro.image} alt={pro.name} className='w-30 max-w-full md:w-full md:h-full cursor-pointer object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105' />
                                </Link>
                                }
                                <div className='flex items-center justify-between pb-3'>
                                    {pro.price &&
                                        <p className='text-tcolor text-[20px]'>${pro.price}</p>
                                    }
                                    <div className='group relative'>
                                        {isInCart(pro._id) ?
                                            <Link to='/cart' onClick={(e) => e.stopPropagation()} className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary'>
                                                <ArrowBigRight size={25} className='text-white' />
                                            </Link>
                                            :
                                            <button onClick={(e) => { e.stopPropagation(); handleCart(pro._id); }} disabled={addToCart.isPending} className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary'>
                                                <FaOpencart size={25} className='text-white' />
                                            </button>
                                        }
                                        {/* tooltip */}
                                        <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`} />
                                        {/* tooltip ends here */}
                                    </div>
                                </div>
                                {/* Hover wishlist and compare */}
                                <div  className='absolute left-0 justify-center right-0 bottom-4 translate-y-full bg-white p-3 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-5 before:w-43 before:border-t-2 before:border-gray-200 before:content-[""]'>
                                    <div className='flex items-center gap-1 justify-center cursor-pointer hover:text-black text-gray-500'>
                                        {isInWishlist(pro._id) ?
                                            <>
                                                <Heart size={18} className='text-black' fill="currentColor" />
                                                <Link to='/wishlist' onClick={(e) => e.stopPropagation()} className='text-[14px]'>Added to Wishlist</Link>
                                            </>
                                            :
                                            <>
                                                <button onClick={(e) => { e.stopPropagation(); handleWishlist(pro._id); }} className='flex items-center gap-2'>
                                                    <Heart size={18} />
                                                    <span className='text-sm'>Wishlist</span>
                                                </button>
                                            </>
                                        }
                                    </div>
                                    <div className='flex items-center gap-1 mt-2 justify-center cursor-pointer hover:text-black text-gray-500 pb-1'>
                                        {isInCompare(pro._id) ?
                                            <>
                                                <GitCompareArrows size={18} className='text-black' />
                                                <Link to='/compare' onClick={(e) => e.stopPropagation()} className='text-[14px]'>Added to Compare</Link>
                                            </>
                                            :
                                            <button onClick={(e) => { e.stopPropagation(); handleCompare(pro._id); }} className='flex items-center gap-2'>
                                                <GitCompareArrows size={18} />
                                                <span className='text-sm'>Compare</span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gridview