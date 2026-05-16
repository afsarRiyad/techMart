import React, { useState } from 'react'
import { Link  } from 'react-router';
import { Eye, EyeOff   } from 'lucide-react';
import Apple from '../assets/images/apple-logo.svg?react'
import Goolgle from '../assets/images/google.svg?react'

const Signup = () => {
   const [show, setShow] = useState(false)
   const [confirmShow, setConfirmShow] = useState(false)
  return (
    <main className="flex items-center justify-center">
     <form className='flex flex-col  shadow-lg max-w-[424px] rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10'>
            <div className='flex justify-around w-full font-robot text-[20px] font-bold text-tcolor border-b border-b-gray-200 '>
               <Link to='/account/login' className='lg:w-[212px] flex justify-center cursor-pointer py-4 text-gray-500 dark:text-gray-400 select-none'>Sign In</Link> 
               <span  className='lg:w-[212px] flex justify-center border-b-[3px] cursor-pointer border-b-primary py-4 dark:text-gray-300 dark:border-b-yellow-500'>Sign Up</span> 
            </div>
         <div className='px-8 flex flex-col gap-4 py-6'>
           <div className=''>
             <label htmlFor='name' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Name</label>
             <input type="text" id='name' className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Enter Your Name'/>
           </div>
           <div className=''>
             <label htmlFor='email' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Email Address</label>
             <input type="email" id='email' className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Enter Your Email'/>
           </div>
           <div className=''>
             <label htmlFor='password' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Password</label>
             <div className='relative'>
               <input id='password' type={show ? "text" : "password"} className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Enter Your Password' autoComplete="new-password"/>
               {show ? 
               <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={()=> setShow(!show)}/> :
                <EyeOff  size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={()=> setShow(!show)}/>
             } 
             </div>
           </div>
           <div className=''>
             <label htmlFor='confirmPassword' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Confirm Password</label>
             <div className='relative'>
               <input id='confirmPassword' type={confirmShow ? "text" : "password"} className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Confirm Your Password' autoComplete="new-password"/>
               {confirmShow ? 
               <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={()=> setConfirmShow(!confirmShow)}/> :
                <EyeOff  size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={()=> setConfirmShow(!confirmShow)}/>
             } 
             </div>
           </div>
           <div className='pt-2 relative'>
             <button className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none'>Sign Up </button>
   
           </div>
            <div className='flex justify-center items-center gap-2 pt-2'>
             <span className='w-40 bg-gray-200 h-[2px]'/>
             <span className='text-inter text-gray-600'>or</span>
             <span className='w-40 bg-gray-200 h-[2px]'/>
            </div>
          <div className='select-none'>
            <div className='border border-gray-200 py-2 flex font-inter items-center cursor-pointer mb-3 hover:shadow-md transition-all duration-300 ease-in-out'>
              <Goolgle fill='currentColor' className='w-8 h-auto ml-3' />
              <span className='text-gray-500 text-[15px] w-full pl-20 darkH'>Login with Google</span>
           </div>
   
            <div className='border border-gray-200 py-2 flex font-inter items-center cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out'>
              <Apple fill='currentColor' className='w-8 dark:text-white h-auto ml-3' />
              <span className='text-gray-500 text-[15px] w-full pl-21 darkH'>Login with Apple</span>
           </div>
          </div>
          </div>
          </form>
          </main>
  )
}

export default Signup