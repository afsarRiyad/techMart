
import React from 'react'
import { Link, useLocation } from 'react-router'
import Container from './layouts/Container';
import { House, ChevronRight  } from 'lucide-react';

const Breadcrumbs = () => {
    let direction = useLocation().pathname.split('/')
    let arr = direction.filter(item => item !== '')
    const capitalize = (text = '') =>{
      return  (
          text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      )
    }
  return (
    <>
  <div className='dark:border-b  dark:border-gray-700'>
      <Container >
        <div className='flex py-6 gap-5 '>
        <ul className='flex items-center gap-3'>
            <li className='hover:bg-black/10 rounded'><Link aria-label='go to home page'  to='/' className='font-inter flex items-center tracking-widest dark:text-white'><House size={22} /></Link></li>
            {arr.map((item, index)=>{
                let isLast = index === arr.length - 1;
                let href = '/' + arr.slice(0, index + 1).join('/')
                
                
            return(
               <li key={href} className='flex gap-2 items-center'>
                 <span className='font-bold dark:text-white'><ChevronRight size={20}/></span>
            {isLast ? 
                <span className='font-inter text-[#29323A] tracking-widest dark:text-white'>{capitalize(item)}</span> :
                <Link to={href} className='cursor-pointer bg-gray-200 text-[#29323A] px-3 py-2 rounded-md font-inter hover:bg-black/20 dark:hover:bg-white/10 dark:bg-white/20 transition-all tracking-widest dark:text-white'>{capitalize(item)}</Link>
              }
               </li>

            ) 
        })}
        </ul>
    </div>
    </Container>
  </div>
    </>
  )
}

export default Breadcrumbs