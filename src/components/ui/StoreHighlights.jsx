import React from 'react'
import Container from '../layouts/Container'

const StoreHighlights = ({data, sale=false}) => {
  return (
    <>
                <div className='font-inter'>
                        <div className={`border-b border-b-gray-300 mb-5 relative  `}>
                            <h1 className='text-[20px] text-tcolor relative after:absolute after:left-0 after:bottom-0 after:w-20 after:border-b-[2px] after:border-b-primary after:content-[""] pb-3'>{data?.title} </h1>
                      </div>
                     {data?.products?.slice(0,3).map((pro, index)=>(
                          <div key={index} className='w-[270px] flex gap-6 items-center pb-5 cursor-pointer'>
                        <img src={pro.image} alt=""  className='w-22'/>
                        <div className='flex flex-col gap-3'>
                            <p className='font-bold text-[14px] text-[#0062BD]  line-clamp-2'>
                                {pro.name}
                            </p>
                            <div className='flex gap-1'>
                                {sale && 
                              <p className='text-red-700'>${pro.salePrice}</p>
                            }
                            <span className={`text-[15px] text-tcolor ${sale && 'line-through' }`}>
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
