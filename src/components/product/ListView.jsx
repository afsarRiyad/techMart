import React from 'react'
import { FaOpencart } from "react-icons/fa6";
import { ArrowBigRight, Star } from 'lucide-react';
import CardActions from '@/components/ui/CardActions';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart';
import { Link } from 'react-router';
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare';
import { useCompare } from '@/features/compare/hooks/useCompare';

const Listview = ({ products }) => {
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
                        className={`flex items-start gap-6 py-6 ${index !== products.length - 1 ?'border-b border-gray-200' : ''}`}
                    >
                        {/* image */}
                        <div className='w-60 shrink-0 flex items-center justify-center'>
                            {pro.image &&
                               <Link to={`/product/${pro.slug || pro._id}`}>
                                  <img loading="lazy" src={pro.image} alt={pro.name || 'img'} className='w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal' />
                               </Link>
                            }
                        </div>

                        {/* details */}
                        <div className='flex-1 min-w-0'>
                            {/* categories */}
                            <div className='flex items-center flex-wrap pt-1 pb-2 pl-4'>
                                {pro?.categories?.map((tag, i) => (
                                    <p key={i} className='truncate text-[12px] text-gray-500 dark:text-gray-400 font-inter cursor-pointer hover:text-gray-900'>
                                        {tag}{i < pro.categories.length - 1 && ','}
                                    </p>
                                ))}
                            </div>

                            {/* name */}
                            {pro.name &&
                                <Link to={`/product/${pro.slug || pro._id}`} className='text-[#0062BD] dark:text-blue-400 pl-4 text-[17px] pt-1 font-semibold leading-tight block pb-4'>
                                    {pro.name}
                                </Link>
                            }

                            {/* rating */}
                            <div className='flex items-center gap-1 pt-2 pb-4 pl-4'>
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
                                <span className='text-[12px] text-gray-500 dark:text-gray-400 font-inter'>({pro.reviews ?? 0})</span>
                            </div>

                            {/* description bullets */}
                            {bullets.length > 0 &&
                                <ul className='pt-3 pl-4'>
                                    {bullets.map((b, i) => (
                                        <li key={i} className='flex items-start gap-1.5 text-[13px] text-gray-500 dark:text-gray-400 font-inter leading-relaxed'>
                                            <span className='mt-[7px] w-1 h-1 rounded-full bg-gray-400 shrink-0' />
                                            <span className='pb-2'>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* sku */}
                            {pro.sku &&
                                <p className='text-[14px] text-gray-400 font-inter pt-6 pl-2'>SKU: {pro.sku}</p>
                            }
                        </div>

                        {/* price + actions */}
                        <div className='w-57 shrink-0 flex flex-col items-start gap-3 pt-1'>
                            <div className='flex items-baseline gap-2'>
                                {displayPrice != null &&
                                    <p className='text-tcolor dark:text-gray-100 text-[22px] font-medium'>${displayPrice.toFixed(2)}</p>
                                }
                                {hasSale &&
                                    <p className='text-[14px] line-through text-red-500'>${pro.regularPrice}</p>
                                }
                            </div>

                            {isInCart(pro._id) ?
                                <Link to='/cart' className='w-full rounded-full bg-gray-200 dark:bg-[#333333] hover:bg-primary flex items-center justify-center gap-2 py-2.5 cursor-pointer transition-colors'>
                                    <ArrowBigRight size={18} />
                                    <span className='text-[18px] font-semibold'>Go to Cart</span>
                                </Link>
                                :
                                <button
                                    onClick={() => handleCart(pro._id)}
                                    disabled={addToCart.isPending}
                                    className='w-full rounded-full bg-primary hover:bg-black transition-colors duration-150 flex items-center justify-center gap-2 py-2.5 cursor-pointer'
                                >
                                    <span className='text-[18px] font-semibold text-white'>Add to cart</span>
                                </button>
                            }

                            <CardActions
                                productId={pro._id}
                                inWishlist={isInWishlist(pro._id)}
                                inCompare={isInCompare(pro._id)}
                                onWishlist={handleWishlist}
                                onCompare={handleCompare}
                                layout='inline'
                                align='between'
                                className='w-full gap-4 px-5 pt-1'
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Listview