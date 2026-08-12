import React from 'react'
import Container from '../layouts/Container'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight, GitCompareArrows, Heart, Star } from 'lucide-react';
import { useAddToCart } from '../../features/Cart/hooks/useAddToCart'
import { useCart } from '../../features/Cart/hooks/useCart.js';
import { Link } from 'react-router';
import { useUpdateWishlist } from '../../features/wishlist/hooks/useUpdateWishlist.js';
import { useWishlist } from '../../features/wishlist/hooks/useWishlist.js';
import Tooltip from '../ui/Tooltip.jsx';

const GridExtend = ({ products }) => {
    const addtoWishlist = useUpdateWishlist()
    const { data: cartData } = useCart()
    const addToCart = useAddToCart()
    const { data: wishlistData } = useWishlist()

    const handleWishlist = (id) => {
        addtoWishlist.mutate({ productId: id })
    }

    const cartItem = cartData?.data?.items || [];
    const wishListItem = wishlistData?.data || [];

    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }

    const isInCart = (proId) => cartItem.some((item) => item?.product?._id === proId)
    const isInWishlist = (proId) => wishListItem.some((item) => item._id === proId);

    // turn description into 2 short bullet points
const getBullets = (description) => {
    if (!description) return [];

    const words = description.trim().split(/\s+/);

    const midpoint = Math.ceil(words.length / 2);

    return [
        words.slice(0, midpoint).join(' '),
        words.slice(midpoint).join(' ')
    ].filter(Boolean);
}
    return (
        <div className='w-full min-w-0'>
            <div className='grid grid-cols-5'>
                {products && products.map((pro, index) => {
                    const bullets = getBullets(pro.description);
                    const hasSale = pro.regularPrice && pro.salePrice && pro.regularPrice > pro.salePrice;
                    const displayPrice = pro.salePrice ?? pro.price;

                    return (
                        <div key={pro._id || pro.id || index} className='group/card min-w-0 mb-5'>
                            <div className={`relative py-3 bg-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] mb-2 cursor-pointer ${(index + 1) % 5 == 0 ? 'border-none' : 'border-r border-r-gray-300'}`}>
                                <div className='px-5'>



                                    {/* image */}
                                    {pro.image &&
                                        <img loading="lazy" src={pro.image} alt={pro.name || 'img'} className='md:w-full w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105' />
                                    }

                                    {/* categories */}
                                    <div className='flex items-center pt-3 pb-2 '>
                                        {pro?.categories?.map((tag, i) => (
                                            <p key={i} className='truncate text-[12px] block text-gray-500 font-inter cursor-pointer hover:text-gray-900'>
                                                {tag}{i < pro.categories.length - 1 && ','}
                                            </p>
                                        ))}
                                    </div>
                                        {/* name */}
                                        {pro.name &&
                                    <span className="block w-full h-10 overflow-hidden text-[#0062BD] text-[16px] leading-5 font-semibold line-clamp-2">
                                    {pro.name}
                                    </span>
                                        }
                                    {/* rating */}
                                    <div className='flex items-center gap-1 pt-3'>
                                        <div className='flex items-center'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                key={star}
                                                size={14}
                                                className={star <= Math.round(pro.rating || 0) ? 'text-primary' : 'text-gray-300'}
                                                fill='currentColor'
                                                />
                                            ))}
                                        </div>
                                        <span className='text-[12px] text-gray-500 font-inter'>({pro.reviews ?? 0})</span>
                                    </div>
                                    {/* description bullets */}
                                    {bullets.length > 0 &&
                                        <ul className='py-6'>
                                            {bullets.map((b, i) => (
                                                <li key={i} className='flex items-start gap-2  text-[13px] text-gray-500 font-inter'>
                                                    <span className='mt-[7px] w-1 h-1 rounded-full bg-gray-400 shrink-0 ' />
                                                    <span className='line-clamp-2 leading-6'>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }

                                    {/* sku */}
                                    {pro.sku &&
                                        <p className='text-[12px] text-gray-400 font-inter pb-1 line-clamp-1 pb-2'>SKU: {pro.sku}</p>
                                    }

                                    {/* price + cart */}
                                    <div className='flex items-center justify-between pb-3'>
                                        <div className='flex items-baseline gap-2'>
                                            {displayPrice != null &&
                                                <p className='text-tcolor font-medium text-[20px]'>${displayPrice}</p>
                                            }
                                            {hasSale &&
                                                <p className='text-gray-400 font-medium text-[13px] line-through'>${pro.regularPrice}</p>
                                            }
                                        </div>
                                        <div className='group relative'>
                                            {isInCart(pro._id) ?
                                                <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary'>
                                                    <ArrowBigRight size={25} className='text-white' />
                                                </Link>
                                                :
                                                <button onClick={() => handleCart(pro._id)} disabled={addToCart.isPending} className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary'>
                                                    <FaOpencart size={25} className='text-white' />
                                                </button>
                                            }
                                            <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`} />
                                        </div>
                                    </div>

                                    {/* hover wishlist and compare */}
                                    <div className='absolute left-0 justify-center right-0 bottom-4 translate-y-full bg-white p-3 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-5 before:w-47 lg:before:w-40 before:border-t-2 before:border-gray-200 before:content-[""]'>
                                        <div className='flex items-center gap-1 justify-center cursor-pointer hover:text-black text-gray-500'>
                                            {isInWishlist(pro._id) ?
                                                <>
                                                    <Heart className='text-black ' size={18} fill="currentColor" />
                                                    <Link to='/wishlist' className='text-[14px]'>Added to Wishlist</Link>
                                                </>
                                                :
                                                <button onClick={() => handleWishlist(pro._id)} className='flex items-center gap-2'>
                                                    <Heart size={18} />
                                                    <span className='text-sm'>Wishlist</span>
                                                </button>
                                            }
                                        </div>
                                        <div className='flex items-center gap-1 mt-2 justify-center cursor-pointer hover:text-black text-gray-500 pb-1'>
                                            <GitCompareArrows size={18} />
                                            <span className='text-sm'>Compare</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GridExtend