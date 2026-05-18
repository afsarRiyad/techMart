import { ChevronRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';

const FeatureCard = ({
       img,
       alt,
       to,
       variant,
       title,
       highlight,
       subtitle,
       price,
       decimal,
       discount,
}) => {
    return (
        <>
            <div className='bg-[#F5F5F5] flex pl-3 py-3 lg:w-auto xl:gap-2 gap-8 items-center  snap-start shrink-0 rounded-lg dark:text-white dark:bg-[#212121]'>
                <div className='w-34 sm:w-48 lg:w-38  shrink-0 relative group overflow-hidden'>
                    <img draggable={false} src={img} alt={alt} className='transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform cursor-pointer group-hover:rotate-6 }' />
                    <span className='absolute inset-0 bg-black/5 dark:bg-white/5 cursor-pointer group-hover:bg-transparent transition-colors duration-300 ease-in-out' />
                </div>
                
                <div className='ps-1  min-w-0'>
                    <h3 className='sm:text-[17px] darkH text-[16px] text-tcolor uppercase leading-6  '>
                        {title} 
                 <span className='font-bold block dark:text-white'>{highlight}</span>
                     {subtitle && 
                       <span className='text-[15px] pt-1 block'>{subtitle}</span>}
                    </h3>
                 <Link className='flex pt-1  gap-2 cursor-pointer items-center select-none active:scale-95 transition-transform duration-150 [WebkitTapHighlightColor:transparent]'>
                    {variant === 'shop' &&
                        <span className='cursor-pointer font-bold text-[14px]'>Shop now </span>
                    }
                {variant === 'price' &&
               <span className='cursor-pointer font-bold text-[14px]'>
                 <span className='m-0'>
                    <sup className='text-[16px] lg:font-bold font-semibold'>$</sup>
                    <span className=' text-[26px] font-bold'>{price}</span>
                    <sup className=' text-[16px] lg:font-bold font-semibold'>{decimal}</sup>
                 </span>
               </span>
                }
            {variant === 'discount' && 
               <span className='cursor-pointer font-bold text-[14px]'>
                 <span className='m-0 flex items-center gap-1 '>
                    <span className='font-inter font-thin text-[15px] leading-none flex flex-col dark:text-white'>
                      <span>UP</span>
                      <span>TO</span>
                    </span>
                    <span className=' text-[26px] font-bold dark:text-white'>{discount}</span>
                    <sup className=' text-[16px] dark:text-white'>%</sup>
                 </span>
               </span>
              }
               <span className='lg:w-6 lg:h-6  bg-primary rounded-full flex justify-center items-center'>
                <ChevronRight size={20} strokeWidth={3} className='text-white' />
               </span>
             </Link>
                </div >
            </div>
        </>
    )
}

export default FeatureCard