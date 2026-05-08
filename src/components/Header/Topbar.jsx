import React from 'react'
import Container from '../layouts/Container'
import { Link } from 'react-router'
import { MapPin, TruckElectric, Handbag, UserRound   } from 'lucide-react';

const Topbar = () => {
  return (
    <>
   <div className='border-b border-b-[#DDDDDD] hidden sm:block'>
     <Container>
        <div className='flex  justify-between items-center font-inter text-[13px] py-2'>
         <div>
          <span> Welcome to Worldwide Electronics Store</span>
         </div>
         <div className='flex items-center gap-8'>
          <Link className='topbarList'> <MapPin className='text-[16px] w-4 h-4'/> Store Locator</Link>
          <Link className='topbarList'> <TruckElectric className='text-[16px] text-tcolor w-4 h-4'/> Track Your Order</Link>
          <Link className='topbarList'> <Handbag  className='text-[16px] w-4 h-4'/> Shop</Link>
          <Link className='flex items-center gap-1 '> <UserRound className='text-[16px] text-tcolor w-4 h-4'/> My Account</Link>
         </div>
        </div>
    </Container>
   </div>
    </>
  )
}

export default Topbar