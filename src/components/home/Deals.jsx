import React from 'react'
import { FaOpencart } from "react-icons/fa6"
import { ArrowBigRight } from 'lucide-react'
import { Link } from 'react-router'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useCart } from '@/features/cart/hooks/useCart'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { useUpdateWishlist } from '@/features/wishlist/hooks/useUpdateWishlist'
import { useUpdateCompare } from '@/features/compare/hooks/useUpdateCompare'
import { useCompare } from '@/features/compare/hooks/useCompare'
import CardActions from '@/components/ui/CardActions'

const Deals = ({ product }) => {
    const addToCart = useAddToCart()
    const {data: cartData} = useCart()
    const {data: wishlistData} = useWishlist()
    const {data: compareData} = useCompare()
    const addToCompare = useUpdateCompare()
    const addToWishlist = useUpdateWishlist()
    const cartItem = cartData?.data?.items || []
    const wishListItem = wishlistData?.data || []
    const compareListItem = compareData?.data || []
    const handleCart = (productId) => {
        addToCart.mutate({ product: productId, quantity: 1 });
    }
    const handleWishlist = (id) => {
        addToWishlist.mutate({ productId: id })
    }
    const handleCompare = (id) => {
        addToCompare.mutate({ productId: id })
    }
    const isInCart = (proId) =>{
        return cartItem.some((item)=> item?.product?._id === proId)
    }
    const isInWishlist = (proId) => {
  return wishListItem.some((item) => item._id === proId);
};
    const isInCompare = (proId) => {
  return compareListItem.some((item) => item._id === proId);
};
    return (
        <div data-touch-hover className="relative after:content-[''] after:absolute after:top-5 after:right-0 after:h-75 after:w-[1px] after:bg-gray-200 last:after:hidden px-4 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] py-2 rounded-md transition-all duration-10 hover:text-black0 bg-white dark:bg-[#262626] dark:bg-neutral-900">
            {/* Categories Layout */}
            <div className='flex flex-wrap items-center line-clamp-2 min-h-[35px]'>
                {product.categories?.slice(0, 2).map((tag, index) => (
                    <p key={tag} className='text-[12px] pr-1 block text-gray-500 dark:text-gray-400 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold'>
                        {tag}{index < product.categories.length - 1 && ','}
                    </p>
                ))}
            </div>

            {/* Product Title */}
            <Link to={`/products/${product.slug || product._id}`} className='text-[#0062BD] dark:text-blue-400 text-[16px] leading-tight min-h-[45px] pt-1 line-clamp-2 font-semibold block'>
                {product.name}
            </Link>

            {/* Product Image Wrapper */}
            <div className='imageTile h-50 flex items-center justify-center overflow-hidden'>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className='max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover/card:scale-105 touchScale' 
                />
            </div>

            {/* Price & Action Container */}
            <div className='flex justify-between items-center pb-2'>
                <p className='pt-3 text-tcolor dark:text-gray-100 text-[20px]'>${product.price}</p>
                
                <div className='group relative'>
                    {isInCart(product._id) ?
                        <Link to='/cart' className='w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center cursor-pointer group-hover/card:bg-primary touchPrimary'>
                            <ArrowBigRight size={20} className='text-white' />
                        </Link>
                        :
                        <button onClick={() => handleCart(product._id)} disabled={addToCart.isPending} className='w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                            <FaOpencart size={20} className='text-white' />
                        </button>
                    }
                </div>
            </div>

            <CardActions
                productId={product._id}
                inWishlist={isInWishlist(product._id)}
                inCompare={isInCompare(product._id)}
                onWishlist={handleWishlist}
                onCompare={handleCompare}
                align='between'
                className='border-t border-t-gray-200 pt-3 pb-1 dark:border-t-[#333333]'
            />
        </div>
    )
}

export default Deals