import React from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import Container from '@/components/layout/Container'
import { Link } from 'react-router'

const TopCategories = () => {
    const { data: cat, loading, errs } = useFetchData('/api/categories')
    const Categories = {
        title: 'Top Categories this Week',
        products: cat
    }
    
    return (
        <div className='bg-[#F4F4F4] dark:bg-[#141414]'>
            <Container>
                <div className='flex md:pt-12 pt-6 md:pb-14 pb-8'>
                    <div className='w-full'>
                        <div className={`border-b border-b-gray-300 dark:border-b-[#333333] mb-5 relative }`}>
                            <h1 className='sectionHeading w-70 border-b-[2px] border-b-primary pb-3'>{Categories?.title}</h1>
                        </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-4'>
                                {Categories?.products?.data?.slice(0,10).map((cat, index)=>(
                                    <Link to={`/category/${cat.slug ?? cat.name}`} key={cat.id} className='flex min-w-0 items-center cardSurface gap-2 md:gap-3 cursor-pointer hover:shadow-lg rounded-sm px-1 py-1'>
                                       <div className='imageTile w-16 sm:w-25 shrink-0'>
                                         <img src={cat.image} className='w-full mix-blend-multiply dark:mix-blend-normal' loading='lazy' alt={cat.name} />
                                       </div>
                                        <span className='font-inter text-[13px] sm:text-[14px] text-[#333E48] hover:text-black dark:text-gray-200 dark:hover:text-gray-100 line-clamp-2'>{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopCategories
