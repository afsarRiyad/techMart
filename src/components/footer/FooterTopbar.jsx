import React from 'react'
import Container from '../layouts/Container'
import { Send } from 'lucide-react';

const FooterTopbar = () => {
  return (
    <div className='bg-primary font-inter py-3 hidden sm:block '>
     <Container>
        <div className='flex gap-4 items-center justify-between'>
          <div className='flex gap-13 items-center '>
              <div className='flex items-center gap-5'>
                <Send size={30} className='text-gray-600'/>
                <span className='text-[20px] text-tcolor leading-12'>
                    Sign up to Newsletter
                </span>
              </div>
              <div className='text-tcolor text-[14px] leading-6 hidden lg:flex'>
                ...and receive <span className='font-bold pl-1'> $20 coupon for first shopping</span>
              </div>
         </div>    
          <div>
            <input type="email" placeholder='Enter your email address' className='bg-white rounded-l-full text-tcolor py-3 px-6 outline-none leading-5 lg:w-[362px] sm:w-[262px]'/>
            <button className='relative text-white bg-black py-[10px] px-5 rounded-r-full group overflow-hidden cursor-pointer active:bg-black/90 '>
                <span className='relative z-10'>
                    SignUp
                </span>
                <span className='absolute  inset-0 bg-primary/40 opacity-0 rounded-r-full scale-x-0 mr-2 origin-left z-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 ease-in-out'/>
            </button>
         </div>    
        </div>  
     </Container>
    </div>
  )
}

export default FooterTopbar