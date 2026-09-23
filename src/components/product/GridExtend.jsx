import React from 'react'
import Container from '@/components/layout/Container'
import { FaOpencart,FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import { ArrowBigRight, GitCompareArrows, Heart, Star } from 'lucide-react';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart';
import { Link } from 'react-router';
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare';
import { useCompare } from '@/features/compare/hooks/useCompare';
import Tooltip from '@/components/ui/Tooltip';
import CardActions from '@/components/ui/CardActions';

const GridExtend = ({ products }) => {
    const addtoWishlist = useUpdateWishlist()
    const addToCompare = useUpdateCompare()
    const { data: cartData } = useCart()
    const addToCart = useAddToCart()
    const { data: wishlistData } = useWishlist()
    const { data: compareData } = useCompare()
    // touch screens get no hover, a tap opens the wishlist/compare row

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

    const rating = (rate) =>{
        const fullRating = Math.floor(rate)
        let rateVisual = []
        for(let i = 0; i < 5; i++){
            if(i<fullRating){
                rateVisual.push(<FaStar  className='text-primary' key={i} />)
            }else{
                rateVisual.push(<FaRegStarHalfStroke className='text-primary' key={i}/>)
            }
        }
        
        return rateVisual
    }

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
            <div className={`grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2`}>
                {products && products.map((pro, index) => {
                    const bullets = getBullets(pro.description);
                    const hasSale = pro.regularPrice && pro.salePrice && pro.regularPrice > pro.salePrice;
                    const displayPrice = pro.salePrice ?? pro.price;

                    return (
                        <div
                            key={pro._id || pro.id || index}
                            className='font-inter group/card min-w-0 mb-5'
                        >
                            <div data-touch-hover className={`relative cardSurface py-3 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] mb-2 cursor-pointer ${(index + 1) % 5 == 0 ?'border-none' : 'border-r border-r-gray-300 dark:border-r-[#333333]'}`}>
                                <div className='px-5'>



                                    {/* image */}
                                    {pro.image &&
                                        <Link to={`/products/${pro.slug}`} className='flex justify-center'>
                                          <img loading="lazy" src={pro.image} alt={pro.name || 'img'} className='imageTile md:w-full w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105 touchScale' />
                                        </Link>
                                    }

                                    {/* categories */}
                                    <div className='flex items-center pt-3 pb-2'>
                                        {pro?.categories?.map((tag, i) => (
                                            <p key={i} className='truncate text-[12px] block text-gray-500 dark:text-gray-400 font-inter cursor-pointer hover:text-gray-900 dark:hover:text-gray-100'>
                                                {tag}{i < pro.categories.length - 1 && ','}
                                            </p>
                                        ))}
                                    </div>
                                        {/* name */}
                                  {pro.name &&
                                    <Link to={`/products/${pro.slug}`} className="block w-full h-10 overflow-hidden text-[#0062BD] dark:text-blue-400 text-[16px] leading-5 font-semibold line-clamp-2">
                                    {pro.name}
                                    </Link>
                                        }
                                    {/* rating */}
                                    <div className='flex items-center gap-1 pt-3'>
                                        <div className='flex items-center'>
                                           {rating(pro.rating || 0)}
                                        </div>
                                        <span className='text-[12px] text-gray-500 dark:text-gray-400 font-inter'>({pro.reviews ?? 0})</span>
                                    </div>
                                    {/* description bullets */}
                                    {bullets.length > 0 &&
                                        <ul className='py-6 h-35'>
                                            {bullets.map((b, i) => (
                                                <li key={i} className='flex items-start gap-2 text-[13px] text-gray-500 dark:text-gray-400 font-inter'>
                                                    <span className='mt-[7px] w-1 h-1 rounded-full bg-gray-400 shrink-0' />
                                                    <span className='line-clamp-2 leading-6'>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }

                                    {/* sku */}
                                    {pro.sku &&
                                        <p className='min-w-0 truncate w-full overflow-hidden pb-3 font-inter text-[12px] text-gray-400'>SKU: {pro.sku}</p>
                                    }

                                    {/* price + cart */}
                                    <div className='flex items-center justify-between pb-3'>
                                        <div className='flex items-baseline'>
                                            {displayPrice != null &&
                                                <p className='text-tcolor dark:text-gray-100 font-medium text-[20px]'>${displayPrice}</p>
                                            }
                                            {hasSale &&
                                                <p className='text-red-400 font-medium text-[13px] line-through'>${pro.regularPrice}</p>
                                            }
                                        </div>
                                        <div className='group relative'>
                                            {isInCart(pro._id) ?
                                                <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary'>
                                                    <ArrowBigRight size={25} className='text-white' />
                                                </Link>
                                                :
                                                <button onClick={() => handleCart(pro._id)} disabled={addToCart.isPending} className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary'>
                                                    <FaOpencart size={25} className='text-white' />
                                                </button>
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
                                        accent='before:right-5 before:w-43 before:border-gray-200'
                                    />
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