import React from 'react'
import { FaOpencart } from "react-icons/fa6"
import { Heart, GitCompareArrows } from 'lucide-react'

const ProductCard = ({ product }) => {
    return (
        <div className="relative after:content-[''] after:absolute after:top-5 after:right-0 after:h-75 after:w-[1px] after:bg-gray-200 last:after:hidden px-4 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] py-2 rounded-md transition-all duration-10 hover:text-black0 bg-white dark:bg-neutral-900">
            {/* Categories Layout */}
            <div className='flex flex-wrap items-center line-clamp-2 min-h-[35px]'>
                {product.categories?.slice(0, 2).map((tag, index) => (
                    <p key={tag} className='text-[12px] pr-1 block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold'>
                        {tag}{index < product.categories.length - 1 && ','}
                    </p>
                ))}
            </div>

            {/* Product Title */}
            <p className='text-[#0062BD] text-[16px] leading-tight min-h-[45px] pt-1 line-clamp-2 font-semibold'>
                {product.name}
            </p>

            {/* Product Image Wrapper */}
            <div className='h-50 flex items-center justify-center overflow-hidden'>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className='max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover/card:scale-105' 
                />
            </div>

            {/* Price & Action Container */}
            <div className='flex justify-between items-center pb-2'>
                <p className='pt-3 text-tcolor text-[20px]'>${product.price}</p>
                
                <div className='group relative'>
                    <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary transition-colors'>
                        <FaOpencart size={25} className='text-white' />
                    </div>

                    {/* Tooltip */}
                    <div className='absolute z-50 left-1/2 -translate-x-1/2 -top-16 mt-5 opacity-0 invisible -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                        <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                            Add to Cart
                        </div>
                        <span className='absolute border-t-black border-[10px] border-transparent -translate-x-1/2 left-1/2 -bottom-5' />
                    </div>
                </div>
            </div>

            {/* Wishlist & Compare Hover Tray */}
            <div className='flex justify-between text-[12px] text-gray-500 pt-3 border-t border-t-gray-200 pb-1 opacity-0 group-hover/card:opacity-100 transition-all duration-150'>
                <div className='flex items-center gap-1 cursor-pointer hover:text-black dark:hover:text-white'>
                    <span className="text-current"><Heart /></span> 
                    <span>Wishlist</span>
                </div>
                <div className='flex items-center gap-1 cursor-pointer hover:text-black dark:hover:text-white'>
                  <span className="text-current"><GitCompareArrows /></span>
                    <span>Compare</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard