import React from 'react'
import Container from '@/components/layout/Container'
import { Link } from 'react-router'

const StoreHighlights = ({data, sale=false}) => {
  return (
    <>
                <div className='font-inter'>
                        <div className={`border-b border-b-gray-300 dark:border-b-[#333333] mb-5 relative`}>
                            <h1 className='text-[20px] text-tcolor dark:text-gray-100 relative after:absolute after:left-0 after:bottom-0 after:w-20 after:border-b-[2px] after:border-b-primary after:content-[""] pb-3'>{data?.title} </h1>
                      </div>
                     {data?.products?.slice(0,3).map((pro, index)=>(
                          <div key={index} className='w-full max-w-[270px] flex gap-6 items-center pb-5 cursor-pointer'>
                        <Link to={`/products/${pro.slug || pro._id}`} className='imageTile shrink-0'>
                            <img src={pro.image} alt={pro.name} className='w-22 cursor-pointer mix-blend-multiply dark:mix-blend-normal' />
                        </Link>
                        <div className='flex flex-col gap-3 min-w-0'>
                            <Link to={`/products/${pro.slug || pro._id}`} className='font-bold text-[14px] text-[#0062BD] dark:text-blue-400 line-clamp-2 cursor-pointer'>
                                {pro.name}
                            </Link>
                            <div className='flex gap-1'>
                                {sale &&
                              <p className='text-red-700 dark:text-red-400'>${pro.salePrice}</p>
                            }
                            <span className={`text-[15px] text-tcolor dark:text-gray-100 ${sale &&'line-through' }`}>
                                ${pro.regularPrice}
                            </span>
                            </div>
                        </div>
                      </div>
                     ))}
                 </div>
    </>
  )
}

export default StoreHighlights
