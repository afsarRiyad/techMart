import React from 'react'
import { useFetchData } from '../hooks/Fetchdata'
import Container from './layouts/Container'

const TopCategories = () => {
    const { data: cat, loading, errs } = useFetchData('/api/categories')
    const Categories = {
        title: 'Top Categories this Week',
        products: cat
    }
    console.log(cat);
    
    return (
        <div className='bg-[#F4F4F4]'>
            <Container>
                <div className='flex md:pt-12 pt-6 md:pb-14 pb-8'>
                    <div className=' w-full '>
                        <div className={`border-b border-b-gray-300 mb-5 relative  }`}>
                            <h1 className='font-inter text-[22px] text-tcolor w-70 border-b-[2px]  border-b-primary pb-3'>{Categories?.title}</h1>
                        </div>
                            <div className='grid grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-4'>
                                {Categories?.products?.data?.slice(0,10).map((cat, index)=>(
                                    <div key={cat.id} className='flex  items-center bg-white gap-3 cursor-pointer hover:shadow-lg rounded-xm px-1'>
                                       <div className='w-25 '>
                                         <img src={cat.image} className='' loading='lazy' alt={cat.name} />
                                       </div>
                                        <span className='font-inter text-[14px] text-[#333E48] hover:text-black hover:underline'>{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopCategories
