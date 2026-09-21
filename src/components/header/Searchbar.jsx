import React, { useEffect, useMemo, useRef, useState } from 'react'
import Logo from '@/assets/images/logo.svg?react'
import LogoWhite from '@/assets/images/LogoWhite.svg?react'
import Container from '@/components/layout/Container'
import Hamberger from '@/components/common/Sidebar'
import { ChevronsUpDown, Search, GitCompareArrows, Heart, UserRound, Handbag, X } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Link, useNavigate } from 'react-router';
import useScrollBlocker from '@/hooks/useScrollBlocker';
import axios from 'axios'
import { useCart } from '@/features/cart/hooks/useCart'
import { useDispatch } from 'react-redux'
import useDebounced from '@/hooks/useDebounced'
import SearchSuggestions from '@/components/header/SearchSuggestions'
import { useSearchProducts } from '@/features/product/hooks/useSearchProducts'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/hooks/useFetchData'
import { clearCustomerToken } from '@/api/apiCustomer'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { setSearch, setActiveCategory } from '@/features/product/productPageSlice'

const Searchbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data} = useCart()
  // shares the ["compare"] cache with the tray and the product cards
  const { data: compareCache } = useQuery({ queryKey: ['compare'] })
  const compareCount = Array.isArray(compareCache?.data) ? compareCache.data.length : 0
  const [category, setCategory] = useState('All Categories')
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([])
  const [catOpen, setCatOpen] = useState(false)
  const [term, setTerm] = useState('')
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [sticky, setSticky] = useState(false)
  const queryClient = useQueryClient()
  const { data: authData } = useAuth()
  const isLoggedIn = !!authData?.data
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef(null)

  const handleLogout = async () => {
    try {
      await logout()
      clearCustomerToken()
      queryClient.setQueryData(['me'], null)
      queryClient.removeQueries({ queryKey: ['me'] })
      setAccountOpen(false)
      navigate('/account/login', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }
  const categoryRef = useRef(null)
  const searchAreaRef = useRef(null)
  const mobileSearchRef = useRef(null)
  // the suggestions panel lives in two places, outside clicks must ignore both
  const searchBoxRefs = useMemo(() => [searchAreaRef, mobileSearchRef], [])

  const debouncedTerm = useDebounced(term, 300)
  const { data: found, isFetching } = useSearchProducts(debouncedTerm, 8)
  const suggestions = found?.data ?? []
  const showSuggestions = suggestOpen && term.trim().length > 0

  useOutsideClick(categoryRef, () => setCatOpen(false), catOpen)
  useOutsideClick(mobileSearchRef, () => setMobileSearch(false), mobileSearch)
  useOutsideClick(searchBoxRefs, () => setSuggestOpen(false), suggestOpen)
  useOutsideClick(accountRef, () => setAccountOpen(false), accountOpen)
  useScrollBlocker(mobileSearch)

  // enter or the search button runs the search on the products page
  const runSearch = () => {
    const value = term.trim()
    if (!value) return
    // drop the previous category, otherwise the results stay filtered by it
    dispatch(setActiveCategory(null))
    dispatch(setSearch(value))
    setSuggestOpen(false)
    setMobileSearch(false)
    navigate('/products')
  }

  const handleTermChange = (event) => {
    setTerm(event.target.value)
    setSuggestOpen(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') runSearch()
    if (event.key === 'Escape') setSuggestOpen(false)
  }
  let totalItem = data?.data?.totalItems
  let totalAmount = data?.data?.totalAmount
 const baseURL = import.meta.env.VITE_API_URL;
  
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

  useEffect(()=>{

       const fetchCat=async()=>{
         try { 
            let res = await axios.get(`${baseURL}/api/categories`)
            setCategories(res.data.data)   
         } catch (error) {
            setError('Failed to load categories')
         } 
      } 
      fetchCat()
  },[])

  return (
    <>
      <div className={`z-80 lg:dark:bg-darkBg transition-all duration-300 lg: ${sticky
          ? 'fixed  w-full top-0 left-0 shadow-md  bg-white animate-sticky lg:animate-none z-[999]'
          : 'relative bg-primary lg:bg-white'}`}>
        <Container>
          {/* mobile searchbar  */}
          {mobileSearch && 
           <div className='fixed left-0 top-16 w-full h-full bg-black/10 z-50' onClick={() => setMobileSearch(false)}/>
          }
          <div ref={mobileSearchRef} className={`absolute  top-full left-0 h-25 z-50   shadow-xl w-full flex items-center font-inter text-tcolor lg:hidden  transition-all duration-200 ease-in-out ${sticky ? 'bg-white  border-t-[2px] border-t-black' : 'bg-primary  border-t-[2px] border-t-white'} ${mobileSearch ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <input type="text" placeholder='Search for products..' className={` ps-6 pe-26  bg-white rounded-full w-[90%] py-4 flex ms-4 outline-none ${sticky ? 'border border-gray-300' : 'border-none'}`} value={term} onChange={handleTermChange} onKeyDown={handleKeyDown} />
            {term !== '' && <X size={18} className=' absolute right-21 cursor-pointer' onClick={() => setTerm('')} />}
            <button type='button' aria-label='Search products' onClick={runSearch} className='absolute right-11 cursor-pointer'>
              <Search size={25} />
            </button>
            {showSuggestions && (
              <SearchSuggestions
                term={term}
                products={suggestions}
                loading={isFetching}
                onPick={() => { setSuggestOpen(false); setMobileSearch(false) }}
                onSeeAll={runSearch}
              />
            )}
          </div>
          {/* mobile searchbar ends here  */}
          <div className='lg:py-7 lg:dark:bg-darkBg py-5 flex lg:gap-5 items-center lg:bg-white '>
            <div className='lg:w-[300px] lg:flex lg:flex-row flex flex-row-reverse justify-between items-center '>
              <Link aria-label='gok to homepage' to='/'><Logo className='lg:h-10 lg:dark:hidden h-6 w-auto block ps-4 lg:ps-0' /></Link>
              <Link aria-label='gok to homepage' to='/'><LogoWhite className='lg:h-10 lg:dark:flex hidden h-6 w-auto pl-10' /></Link>
              <Hamberger  />
            </div>
            <div className='flex flex-1 items-center gap-20 min-w-0'>
             <div ref={searchAreaRef} className='relative rounded-full h-[44px] hidden lg:flex items-center flex-1 max-w-[850px]'>
                <input type="text" placeholder='Search for Products' value={term} onChange={handleTermChange} onFocus={() => setSuggestOpen(true)} onKeyDown={handleKeyDown} className='flex-1 min-w-0 dark:bg-[#212121] dark:placeholder:text-gray-400 rounded-l-full text-inter text-tcolor text-[14px] py-2 px-8 outline-none bg-white border-2 dark:border-yellow-500 border-primary border-r-0 ml-[2px] placeholder:font-inter placeholder:text-gray-600 leading-6'/>
              { catOpen && <div className='fixed inset-0 left-0 top-34  bg-black/10'/>}
               {/* all categories starts here  */}
                <div className='relative' ref={categoryRef}>
                  <h2 className='dark:bg-[#212121]  dark:text-gray-400 bg-white outline-none select-none border border-[2px]  border-primary border-x-0 pt-[9px] pb-[10px] cursor-pointer text-[14px] w-54 font-inter text-tcolor' onClick={() => setCatOpen(!catOpen)}>{category}</h2>
                  <ul className={`absolute top-full border bg-white shadow-md dark:bg-[#181818]  dark:border-gray-500 border-gray-200  transition ${catOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none '}`}>
                    {error && 
                         <p>{error}</p>}
                    {
                      categories?.map((item, index) => (
                        <li key={index} className={`dark:text-gray-100 ${category === item.name && 'bg-blue-500 text-white'}`}>
                          <Link
                            to={`/category/${item.slug ?? item.name}`}
                            onClick={() => { setCategory(item.name); setCatOpen(false) }}
                            className='level0 block'
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                  <ChevronsUpDown size={15} className='absolute top-4  right-4 text-gray-500 pointer-events-none' />
                </div>
              {/* all categories ends here  */}
                <button type='button' aria-label='Search products' onClick={runSearch} className='w-16 h-11  bg-primary dark:bg-yellow-500 flex justify-center items-center rounded-r-full cursor-pointer'>
                  <Search size={23} />
                </button>
                {showSuggestions && (
                  <SearchSuggestions
                    term={term}
                    products={suggestions}
                    loading={isFetching}
                    onPick={() => { setSuggestOpen(false); setMobileSearch(false) }}
                    onSeeAll={runSearch}
                  />
                )}
              </div>
             <div className='relative flex lg:gap-9.5 lg:w-auto w-full justify-end gap-8 lg:pr-0 pr-2 shrink-0'>
                <Link aria-label='compare products' to='/compare' className='searchbarIconhover hidden lg:block relative group' >
                <div className='relative'>
                <GitCompareArrows size={22} className='text-tcolor lg:dark:text-gray-200' />
                {compareCache ? (
                <span className='absolute -bottom-2 -right-1 bg-primary text-black text-[12px] rounded-full w-5 h-5 font-semibold flex items-center justify-center'>
                  {compareCount}
                </span>
                ) : (
                <span aria-hidden='true' className='absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-gray-300 animate-pulse' />
                )}
                </div>
                 {/* Compare Tooltip  */}
                     <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        Compare
                      </div>
                      <span className='absolute border-b-black border-[10px] border-transparent -translate-x-1/2 left-1/2 bottom-8 ' />
                     </div>
                </Link>
                  <Link to='/wishlist' aria-label='browse to wishlist' className='relative group '>
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
                {isLoggedIn ? (
                  <div ref={accountRef} className='relative'>
                    <button type='button' aria-label='account menu' onClick={() => setAccountOpen(!accountOpen)} className='cursor-pointer'>
                      <UserRound size={22} className='text-tcolor lg:dark:text-gray-200' />
                    </button>
                    <div className={`absolute right-0 top-full mt-3 w-52 bg-white dark:bg-[#181818] rounded-md shadow-lg border-t-4 border-primary transition-all duration-200 ${accountOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      <div className='py-2'>
                        {[
                          { label: 'Dashboard', href: '/account' },
                          { label: 'Orders', href: '/account/orders' },
                          { label: 'Downloads', href: '/account/downloads' },
                          { label: 'Addresses', href: '/account/addresses' },
                          { label: 'Payment methods', href: '/account/payments-methods' },
                          { label: 'Account details', href: '/account/account-details' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setAccountOpen(false)}
                            className='block px-5 py-2.5 text-[14px] font-inter text-tcolor dark:text-gray-200 hover:text-black hover:bg-gray-50 dark:hover:bg-[#252525]'
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className='border-t border-gray-200 dark:border-gray-600 mx-4'></div>
                        <button
                          type='button'
                          onClick={handleLogout}
                          className='block w-full text-left px-5 py-2.5 text-[14px] font-inter text-tcolor dark:text-gray-200 hover:text-black hover:bg-gray-50 dark:hover:bg-[#252525] cursor-pointer'
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div ref={accountRef} className='relative'>
                    <button type='button' aria-label='account menu' onClick={() => setAccountOpen(!accountOpen)} className='cursor-pointer'>
                      <UserRound size={22} className='text-tcolor lg:dark:text-gray-200' />
                    </button>
                    <div className={`absolute right-0 top-full mt-3 w-56 bg-white dark:bg-[#181818] rounded-md shadow-lg border-t-4 border-primary transition-all duration-200 ${accountOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      <div className='p-5'>
                        <p className='text-[15px] font-inter text-tcolor dark:text-gray-200 mb-3'>Returning Customer ?</p>
                        <Link to='/account/login' onClick={() => setAccountOpen(false)} className='block w-20 text-center mx-auto bg-primary hover:bg-yellow-400 text-black font-medium text-[15px] py-1.5 rounded-sm font-inter'>
                          Sign in
                        </Link>
                        <div className='border-t border-gray-200 dark:border-gray-600 my-4'></div>
                        <p className='text-[15px] font-inter text-tcolor dark:text-gray-200 mb-2'>Don't have an account ?</p>
                        <Link to='/account/signup' onClick={() => setAccountOpen(false)} className='block text-center text-[15px] font-inter text-tcolor dark:text-gray-200 hover:text-black underline'>
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <Link aria-label='go to Cart' to='/cart' className='flex gap-2 group relative'>
                  <div className={`relative `}>
                    <Handbag size={22} className='text-tcolor lg:dark:text-gray-200' />
                    {/* same rule as the compare badge, wait for the cart before showing a count */}
                    <span className={`absolute -bottom-2 -right-1 text-[12px] rounded-full w-5 h-5 font-semibold flex items-center justify-center ${data ? 'bg-primary text-black' : 'bg-gray-300 animate-pulse'}`}>
                      {data ? totalItem ?? 0 : ''}
                    </span>
                  </div>
                  <span className='text-[16px] font-inter font-bold text-[#333E48] lg:dark:text-gray-200 hidden lg:block'>${totalAmount?.toFixed(2) || '0.00'}</span>
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