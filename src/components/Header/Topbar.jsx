import React from 'react'
import Container from '../layouts/Container'
import { Link } from 'react-router'
import { MapPin, TruckElectric, Handbag, UserRound   } from 'lucide-react';

const Topbar = () => {
  return (
    <>
   <div className='border-b border-b-[#DDDDDD] hidden sm:block darkbg'>
     <Container>
        <div className='flex  justify-between items-center font-inter text-[13px] py-2'>
         <div>
          <span> Welcome to Worldwide Electronics Store</span>
         </div>
         <div className='flex items-center gap-8 '>
          <Link className='topbarList darktxt '> <MapPin className='text-[16px] w-4 h-4'/> Store Locator</Link>
          <Link to='/track-order' className='topbarList darktxt '> <TruckElectric size={16} className=''/> Track Your Order</Link>
          <Link className='topbarList darktxt '> <Handbag  className='text-[16px] w-4 h-4'/> Shop</Link>
          <Link to='/account' className='flex items-center gap-1 dark:hover:text-white'> <UserRound size={16} className=' '/> My Account</Link>
         </div>
        </div>
    </Container>
   </div>
    </>
  )
}

export default Topbar