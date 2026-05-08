import React, { useRef, useState } from 'react'
import Logo from '../../assets/images/logo.svg?react'
import Container from '../../components/layouts/Container'
import Hamberger from '../../components/Hamberger'
import { ChevronsUpDown, Search, GitCompareArrows, Heart, UserRound, Handbag } from 'lucide-react';
import useOutsideClick from '../../hooks/outsideClick';
import { Link } from 'react-router';

const categoires = [
  'Uncategorized',
  'Accessories',
  'Cameras & Photography',
  'Computer Components',
  'Gadgets',
  'Home Entertainment',
  'Laptop and Computers',
  'Printers & Ink',
  'Smart Phones & Tablets',
  'TV & Audio',
  'Video Games & Consoles',
  'Stereo',
  'Home Theatre',
  'Bluetooth Speakers',
  'Headphones',
  'Speakers',
]

const Searchbar = () => {
  const [category, setCategory] = useState('All Categories')
  const [catOpen, setCatOpen] = useState(false)
  const categoryRef = useRef(null)
  useOutsideClick(categoryRef, ()=> setCatOpen(false), catOpen)
  return (
    <>
      <Container>
        <div className='py-7 flex gap-8 items-center'>
          <div className='lg:w-[300px] flex justify-between items-center'>
            <Logo className='max-h-10 w-auto block' />
            <div> <Hamberger /></div>
          </div>
          <div className='flex gap-17 items-center'>
            <div className=' rounded-full h-[44px] lg:w-140 w-100 flex items-center'>
              <input type="text" placeholder='Search for Products' className=' rounded-l-full  text-inter text-tcolor text-[14px] py-2 px-8 outline-none bg-white border border-[2px]  border-primary border-r-0 lg:w-70 ml-[2px]  placeholder:font-inter placeholder:text-gray-600 text-md leading-6' />
              <div className='relative' ref={categoryRef}>
                <h2 className='  bg-white outline-none select-none border border-[2px]  border-primary border-x-0 pt-[9px] pb-[10px] cursor-pointer text-[14px] w-54 font-inter text-tcolor' onClick={()=> setCatOpen(!catOpen)}>{category}</h2>
                <ul className={`absolute top-full border border-gray-200  transition ${catOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none '}`}>
                 {
                  categoires.map((item, index)=>(
                    <li key={index} className={`level0 ${category === item && 'bg-blue-500 text-white'}`} onClick={()=> {setCategory(item); setCatOpen(false)}}>{item}</li>
                  ))
                 }
                </ul>
                <ChevronsUpDown size={15} className='absolute top-4  right-4 text-gray-500 pointer-events-none' />
              </div>
              <div className='w-16 h-11  bg-primary flex justify-center items-center rounded-r-full'>
                <Search size={23} className='cursor-pointer'/>
              </div>
            </div>
            <div className='flex gap-9.5'>
              <Link to='#' className='searchbarIconhover'><GitCompareArrows size={22} className='text-tcolor '/></Link>
              <Link to='#'><Heart  size={22} className='text-tcolor'/></Link>
              <Link to='#'><UserRound  size={22} className='text-tcolor'/></Link>
              <Link to='#' className='flex gap-2'>
                <div className='searchbarIconhover'>
                  <Handbag  size={22} className='text-tcolor'/>
                </div>
                  <span className='text-[16px] font-inter font-bold text-[#333E48]'>$0.00</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Searchbar