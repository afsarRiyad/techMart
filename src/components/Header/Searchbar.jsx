import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/images/logo.svg?react'
import Container from '../layouts/Container'
import Hamberger from '../Hamberger'
import { ChevronsUpDown, Search, GitCompareArrows, Heart, UserRound, Handbag, X } from 'lucide-react';
import useOutsideClick from '../../hooks/outsideClick';
import { Link } from 'react-router';
import { categories } from '../../data/Navigation'
import useScrollBlocker from '../../hooks/scrollBlocker';

const Searchbar = () => {
  const [category, setCategory] = useState('All Categories')
  const [catOpen, setCatOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [mobileSearch, setMobileSearch] = useState(false)
  const [sticky, setSticky] = useState(false)
  const categoryRef = useRef(null)
  const mobileSearchRef = useRef(null)
  useOutsideClick(categoryRef, () => setCatOpen(false), catOpen)
  useOutsideClick(mobileSearchRef, () => setMobileSearch(false), mobileSearch)
  useScrollBlocker(mobileSearch)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className={`z-50 transition-all duration-300 lg: ${sticky
          ? 'fixed  w-full top-0 left-0 shadow-md  bg-white animate-sticky lg:animate-none z-[999]'
          : 'relative bg-primary lg:bg-white'}`}>
        <Container>
          {/* mobile searchbar  */}
          {mobileSearch && 
           <div className='fixed inset-0 bg-black/10'/>
          }
          <div ref={mobileSearchRef} className={`absolute top-full left-0 h-25 z-50   shadow-xl w-full flex items-center font-inter text-tcolor lg:hidden  transition-all duration-200 ease-in-out ${sticky ? 'bg-white  border-t-[2px] border-t-black' : 'bg-primary  border-t-[2px] border-t-white'} ${mobileSearch ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <input type="text" placeholder='Search for products..' className={` ps-6 pe-26  bg-white rounded-full w-[90%] py-4 flex ms-4 outline-none ${sticky ? 'border border-gray-300' : 'border-none'}`} value={search} onChange={(e) => setSearch(e.target.value)} />
            {search !== '' && <X size={18} className=' absolute right-21 cursor-pointer' onClick={() => setSearch('')} />}
            <Search size={25} className='cursor-pointer absolute right-11' />
          </div>
          <div className='lg:py-7 py-5 flex lg:gap-8 items-center lg:bg-white '>
            <div className='lg:w-[300px] lg:flex lg:flex-row flex flex-row-reverse justify-between items-center ps-2'>
              <Link to='/'><Logo className='lg:h-10 h-6 w-auto block ps-4' /></Link>
              <Hamberger />
            </div>
            <div className='flex flex-1 justify-between items-center'>
              <div className=' rounded-full h-[44px] lg:w-140 w-100 flex items-center hidden lg:flex'>
                <input type="text" placeholder='Search for Products' className=' rounded-l-full  text-inter text-tcolor text-[14px] py-2 px-8 outline-none bg-white border border-[2px]  border-primary border-r-0 lg:w-70 ml-[2px]  placeholder:font-inter placeholder:text-gray-600 text-md leading-6' />
                <div className='relative' ref={categoryRef}>
                  <h2 className='  bg-white outline-none select-none border border-[2px]  border-primary border-x-0 pt-[9px] pb-[10px] cursor-pointer text-[14px] w-54 font-inter text-tcolor' onClick={() => setCatOpen(!catOpen)}>{category}</h2>
                  <ul className={`absolute top-full border bg-white shadow-md border-gray-200  transition ${catOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none '}`}>
                    {
                      categories.map((item, index) => (
                        <li key={index} className={`level0 ${category === item.name && 'bg-blue-500 text-white'}`} onClick={() => { setCategory(item.name); setCatOpen(false) }}>
                          <Link to={item.url || '#'}>{item.name}</Link>
                        </li>
                      ))
                    }
                  </ul>
                  <ChevronsUpDown size={15} className='absolute top-4  right-4 text-gray-500 pointer-events-none' />
                </div>
                <div className='w-16 h-11  bg-primary flex justify-center items-center rounded-r-full'>
                  <Search size={23} className='cursor-pointer' />
                </div>
              </div>
              <div className='relative flex lg:gap-9.5 w-full justify-end  gap-8 lg:pr-0 pr-2'>
                <Link aria-label='compare products' to='#' className='searchbarIconhover hidden lg:block' ><GitCompareArrows size={22} className='text-tcolor  ' /></Link>
                <Link to='#' aria-label='browse to wishlist'><Heart size={22} className='text-tcolor hidden lg:flex' /></Link>
                {
                  mobileSearch ? <X size={23} className='cursor-pointer lg:hidden ' onClick={() => setMobileSearch(false)} /> :
                    <Search size={23} className='cursor-pointer lg:hidden' onClick={() => setMobileSearch(true)} />
                }
                <Link to='/account' aria-label='go to myAccount'><UserRound size={22} className='text-tcolor' /></Link>
                <Link aria-label='go to Cart' to='/cart' className='flex gap-2'>
                  <div className={`searchbarIconhover `}>
                    <Handbag size={22} className='text-tcolor' />
                  </div>
                  <span className='text-[16px] font-inter font-bold text-[#333E48] hidden lg:block'>$0.00</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Searchbar