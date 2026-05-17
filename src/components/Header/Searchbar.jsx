import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/images/logo.svg?react'
import LogoWhite from '../../assets/images/LogoWhite.svg?react'
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
      <div className={`z-50 lg:dark:bg-darkBg transition-all duration-300 lg: ${sticky
          ? 'fixed  w-full top-0 left-0 shadow-md  bg-white animate-sticky lg:animate-none z-[999]'
          : 'relative bg-primary lg:bg-white'}`}>
        <Container>
          {/* mobile searchbar  */}
          {mobileSearch && 
           <div className='fixed left-0 top-16 w-full h-full bg-black/10 z-50' onClick={() => setMobileSearch(false)}/>
          }
          <div ref={mobileSearchRef} className={`absolute  top-full left-0 h-25 z-50   shadow-xl w-full flex items-center font-inter text-tcolor lg:hidden  transition-all duration-200 ease-in-out ${sticky ? 'bg-white  border-t-[2px] border-t-black' : 'bg-primary  border-t-[2px] border-t-white'} ${mobileSearch ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <input type="text" placeholder='Search for products..' className={` ps-6 pe-26  bg-white rounded-full w-[90%] py-4 flex ms-4 outline-none ${sticky ? 'border border-gray-300' : 'border-none'}`} value={search} onChange={(e) => setSearch(e.target.value)} />
            {search !== '' && <X size={18} className=' absolute right-21 cursor-pointer' onClick={() => setSearch('')} />}
            <Search size={25} className='cursor-pointer absolute right-11' />
          </div>
          <div className='lg:py-7 lg:dark:bg-darkBg py-5 flex lg:gap-5 items-center lg:bg-white '>
            <div className='lg:w-[300px] lg:flex lg:flex-row flex flex-row-reverse justify-between items-center ps-2'>
              <Link aria-label='gok to homepage' to='/'><Logo className='lg:h-10 lg:dark:hidden h-6 w-auto block ps-4 ' /></Link>
              <Link aria-label='gok to homepage' to='/'><LogoWhite className='lg:h-10 lg:dark:flex hidden h-6 w-auto pr-6' /></Link>
              <Hamberger className='pl-5' />
            </div>
            <div className='flex flex-1 items-center gap-20 min-w-0'>
             <div className='rounded-full h-[44px] hidden lg:flex items-center flex-1 max-w-[850px]'>
                <input type="text" placeholder='Search for Products' className='flex-1 min-w-0 dark:bg-[#212121] dark:placeholder:text-gray-400 rounded-l-full text-inter text-tcolor text-[14px] py-2 px-8 outline-none bg-white border-2 dark:border-yellow-500 border-primary border-r-0 ml-[2px] placeholder:font-inter placeholder:text-gray-600 leading-6'/>
              { catOpen && <div className='fixed inset-0 left-0 top-34  bg-black/10'/>}
                <div className='relative' ref={categoryRef}>
                  <h2 className='dark:bg-[#212121] dark:text-gray-400 bg-white outline-none select-none border border-[2px]  border-primary border-x-0 pt-[9px] pb-[10px] cursor-pointer text-[14px] w-54 font-inter text-tcolor' onClick={() => setCatOpen(!catOpen)}>{category}</h2>
                  <ul className={`absolute top-full border bg-white shadow-md  border-gray-200  transition ${catOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none '}`}>
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
                <div className='w-16 h-11  bg-primary dark:bg-yellow-500 flex justify-center items-center rounded-r-full'>
                  <Search size={23} className='cursor-pointer' />
                </div>
              </div>
             <div className='relative flex lg:gap-9.5 lg:w-auto w-full justify-end gap-8 lg:pr-0 pr-2 shrink-0'>
                <Link aria-label='compare products' to='#' className='searchbarIconhover hidden lg:block relative group' >
                <GitCompareArrows size={22} className='text-tcolor lg:dark:text-gray-200' />
                 {/* Compare Tooltip  */}
                     <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        Compare
                      </div>
                      <span className='absolute border-b-black border-[10px] border-transparent -translate-x-1/2 left-1/2 bottom-8 ' />
                     </div>
                </Link>
                  <Link to='#' aria-label='browse to wishlist' className='relative group '>
                     <Heart size={22} className='text-tcolor lg:dark:text-gray-200 hidden lg:flex' />
                     {/*wishlist tooltip  */}
                     <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        Wishlist
                      </div>
                      <span className='absolute border-b-black border-[10px] border-transparent -translate-x-1/2 left-1/2 bottom-8 ' />
                     </div>
                  </Link>
                {
                  mobileSearch ? <X size={23} className='cursor-pointer lg:hidden ' onClick={() => setMobileSearch(false)} /> :
                    <Search size={23} className='cursor-pointer lg:hidden dark:text-tcolor' onClick={() => setMobileSearch(true)} />
                }
                <Link to='/account' aria-label='go to myAccount ' className='relative group'>
                   <UserRound size={22} className='text-tcolor lg:dark:text-gray-200' />
                   {/* My Account Tooltip  */}
                     <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        My Account
                      </div>
                      <span className='absolute border-b-black border-[10px] border-transparent -translate-x-1/2 left-1/2 bottom-8 ' />
                     </div>
                   </Link>
                <Link aria-label='go to Cart' to='/cart' className='flex gap-2 group relative'>
                  <div className={`searchbarIconhover `}>
                    <Handbag size={22} className='text-tcolor lg:dark:text-gray-200' />
                  </div>
                  <span className='text-[16px] font-inter font-bold text-[#333E48] lg:dark:text-gray-200 hidden lg:block'>$0.00</span>
                   {/*Cart Tooltip  */}
                     <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        Cart
                      </div>
                      <span className='absolute border-b-black border-[10px] border-transparent -translate-x-1/2 left-1/2 bottom-8 ' />
                     </div>
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