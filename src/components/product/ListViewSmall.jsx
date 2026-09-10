import React from 'react'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight, Heart, GitCompareArrows, Star } from 'lucide-react';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart';
import { Link } from 'react-router';
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare';
import { useCompare } from '@/features/compare/hooks/useCompare';
import Tooltip from '@/components/ui/Tooltip';

const ListViewSmall = ({ products }) => {
    const addtoWishlist = useUpdateWishlist()
    const addToCompare = useUpdateCompare()
    const { data: cartData } = useCart()
    const addToCart = useAddToCart()
    const { data: wishlistData } = useWishlist()
    const { data: compareData } = useCompare()

    const handleWishlist = (id) => {
        addtoWishlist.mutate({ productId: id })
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

    const isInCart = (proId) => cartItem.some((item) => item?.product?._id === proId)
    const isInWishlist = (proId) => wishListItem.some((item) => item._id === proId);
    const isInCompare = (proId) => compareListItem.some((item) => item._id === proId);

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
            {products && products.map((pro, index) => {
                const bullets = getBullets(pro.description);
                const hasSale = pro.regularPrice && pro.salePrice && pro.regularPrice > pro.salePrice;
                const displayPrice = pro.salePrice ?? pro.price;

                return (
                    <div
                        key={pro._id || pro.id || index}
                        className={`flex items-start gap-6 py-6 ${index !== products.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                        {/* image */}
                        <div className='w-40 shrink-0 flex items-center justify-center'>
                            {pro.image &&
                            <Link to={`/products/${pro.slug || pro._id}`} >
                                <img loading="lazy" src={pro.image} alt={pro.name || 'img'} className='w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal' />
                            </Link>
                            }
                        </div>

                        {/* details */}
                        <div className='flex-1 min-w-0'>
                            {/* categories */}
                            <div className='flex items-center flex-wrap pt-1'>
                                {pro?.categories?.map((tag, i) => (
                                    <p key={i} className='truncate text-[12px] text-gray-500 font-inter cursor-pointer hover:text-gray-900'>
                                        {tag}{i < pro.categories.length - 1 && ','}&nbsp;
                                    </p>
                                ))}
                            </div>

                            {/* name */}
                            {pro.name &&
                                <Link to={`/products/${pro.slug || pro._id}`} className='text-[#0062BD] text-[17px] pt-1 font-semibold leading-tight block '>
                                    {pro.name}
                                </Link>
                            }

                            {/* rating */}
                            <div className='flex items-center gap-1 pt-2'>
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
                                <ul className='pt-3'>
                                    {bullets.map((b, i) => (
                                        <li key={i} className='flex items-start gap-1.5 text-[13px] text-gray-500 font-inter leading-relaxed'>
                                            <span className='mt-[7px] w-1 h-1 rounded-full bg-gray-400 shrink-0' />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* sku */}
                            {pro.sku &&
                                <p className='text-[12px] text-gray-400 font-inter pt-6'>SKU: {pro.sku}</p>
                            }
                        </div>

                        {/* price + actions */}
                        <div className='w-48 shrink-0 flex flex-col gap-3 pt-1'>
                            <div className='flex items-center justify-between border-b border-b-gray-300 pb-4'>
                               <div className='flex '>
                                 {displayPrice != null &&
                                    <p className='text-tcolor text-[20px] font-medium'>${Number(displayPrice).toFixed(2)}</p>
                                }
                                {hasSale &&
                                <p className='text-[13px] text-red-400 font-medium line-through -mt-2'>${pro.regularPrice}</p>
                            }
                               </div>
                                <div className='relative group'>
                                    {isInCart(pro._id) ?
                                        <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-primary'>
                                            <ArrowBigRight size={22} className='text-white' />
                                        </Link>
                                        :
                                        <button
                                            onClick={() => handleCart(pro._id)}
                                            disabled={addToCart.isPending}
                                            className='w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer'
                                        >
                                            <FaOpencart size={20} className='text-white' />
                                        </button>
                                    }
                                    <Tooltip title={`${isInCart(pro._id) ? 'Go to Cart' : 'Add to Cart'}`} />
                                </div>
                            </div>

                            

                            <div className='flex items-center justify-center gap-4'>
                                <div className='flex items-center gap-1 cursor-pointer hover:text-black text-gray-500'>
                                    {isInWishlist(pro._id) ?
                                        <>
                                            <Heart size={16} className='text-black' fill="currentColor" />
                                            <Link to='/wishlist' className='text-sm'>Wishlist</Link>
                                        </>
                                        :
                                        <button onClick={() => handleWishlist(pro._id)} className='flex items-center gap-1'>
                                            <Heart size={16} />
                                            <span className='text-sm'>Wishlist</span>
                                        </button>
                                    }
                                </div>
                                <div className='flex items-center gap-1 cursor-pointer hover:text-black text-gray-500'>
                                    {isInCompare(pro._id) ?
                                        <>
                                            <GitCompareArrows size={16} className='text-black' />
                                            <Link to='/compare' className='text-sm'>Compare</Link>
                                        </>
                                        :
                                        <button onClick={() => handleCompare(pro._id)} className='flex items-center gap-1'>
                                            <GitCompareArrows size={16} />
                                            <span className='text-sm'>Compare</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListViewSmall