import React from 'react'
import Container from './../layouts/Container';
import { CopyrightIcon } from 'lucide-react';
import paymentIcon from '../../assets/images/patment-icon.webp';

const Copyright = () => {
  return (
    <div className='bg-[#EAEAEA] text-tcolor font-inter py-3 text-[14px] mb-4 hidden sm:block'>
        <Container>
             <div className='flex justify-between'>
                <div className='flex items-center'>
                    <CopyrightIcon size={14} className='mr-1'/>
                    <span className='font-semibold'>Electro</span>- ALL Rights Reserved
                </div>
                <img src={paymentIcon} alt="payment icon" className='cursor-pointer'/>
             </div>
        </Container>
    </div>
  )
}

export default Copyright