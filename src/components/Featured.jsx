import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaOpencart } from "react-icons/fa6";
import {  GitCompareArrows, Heart  } from 'lucide-react';
import Container from './layouts/Container';

const Featured = () => {
    const [sections, setSections] = useState([])
    const [show, setShow]= useState(0)
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const fetchData = async()=>{
             try {
                setLoading(true)
                const res = await axios.get('https://electrobackend-1.onrender.com/api/home-v3')
                setSections(res.data.data.sections)
                console.log(Object.values(res.data));
                
             } catch (error) {
                console.error(error);
                setErrors('Error loading products')
             } finally{
                setLoading(false)
             }
        }
        fetchData()
    },[])
    const currentSection = sections[show]
    if (loading) return <p className="text-center p-10 text-gray-500 font-inter">Loading items...</p>
    if (errors) return <p className="text-center p-10 text-red-500 font-inter">{errors}</p>
  return (
    <Container  className='font-inter dark:text-white'>
        <div className='flex justify-center items-center gap-5 font-inter text-[18px] text-[#333E48] pt-6 pb-2 border-b border-b-gray-200 mb-8'>
        <span onClick={()=>setShow(0)} className={`${show === 0 && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>Featured</span>
        <span onClick={()=>setShow(1)} className={`${show === 1 && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>On Sale </span>
        <span onClick={()=>setShow(2)} className={`${show === 2 && 'featuredSpan'} dark:text-gray-300 cursor-pointer `}>Top Rated</span>
    </div>
        {currentSection && (
            <div className='pb-5'>
              <div className='grid xl:grid-cols-6 md:grid-cols-4 overflow-hidde'>
                {currentSection.products && currentSection.products.slice(0,6).map(pro =>(
                    <div key={pro.id} className={`relative after:content-[''] after:absolute after:top-5 after:right-0 after:h-75 after:w-[1px] after:bg-gray-200 last:after:hidden px-4 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] py-2 rounded-md transition-all duration-10 hover:text-black0`}>
                        <div className='flex flex-wrap items-center line-clamp-2 min-h-[35px] '>
                            {pro.categories?.slice(0,2).map((tag, index)=>(
                            <p key={tag} className='text-[12px] pr-1 block text-gray-500 font-inter cursor-pointer hover:text-gray-500 hover:font-semibold '>{tag}
                             {index < pro.categories.length - 1 && ','}
                            </p>
                        ))}
                        </div>
                        <p className='text-[#0062BD] text-[16px] leading-tight min-h-[45px] pt-1 line-clamp-2 font-semibold'>{pro.name}</p>
                      <div className='h-50 flex items-center justify-center overflow-hidden'>
                        <img src={pro.image} alt="" className='max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover/card:scale-105' />
                      </div>
                     <div className='flex justify-between items-center pb-2'>
                        <p className='pt-3 text-tcolor text-[20px] '>${pro.price}</p>
                        <div className='group relative'>
                        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center  cursor-pointer group-hover/card:bg-primary'>
                            <FaOpencart size={25} className='text-white' />
                        </div>
                     {/* tooltip  */}
                        <div className='absolute z-50 left-1/2 -translate-x-1/2 -top-16 mt-5 opacity-0 invisible -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        Add to Cart
                      </div>
                      <span className='absolute border-t-black border-[10px] border-transparent -translate-x-1/2 left-1/2 -bottom-5 ' />
                     </div>
                    {/* tooltip ends here  */}
                    </div>
                     </div>
                     <div className='flex justify-between text-[12px] text-gray-500 pt-3 border-t border-t-gray-200 pb-1 opacity-0 group-hover/card:opacity-100 transition-all duration-150'>
                        <div className='flex items-center gap-1 cursor-pointer hover:text-black'>
                            <Heart />
                            <span>Wishlist</span>
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer hover:text-black'>
                             <GitCompareArrows/>
                            <span>Compare</span>
                        </div>
                     </div>
                    </div>
                ))}
              </div>
            </div>
  ) }
    </Container>
  )
}

export default Featured
