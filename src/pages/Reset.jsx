import React, { useState } from 'react'
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import Apple from '../assets/images/apple-logo.svg?react'
import Goolgle from '../assets/images/google.svg?react'


const Reset = () => {
      const [show, setShow] = useState(false)
      const [confirmShow, setConfirmShow] = useState(false)
  return (
     <main className="flex items-center justify-center mx-auto max-w-[424px] ]">
      <form className='flex flex-col  shadow-lg rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10'>
       <div className='flex flex-col items-center text-center w-full gap-2 p-8'>
                    <h1 className='font-robot text-[20px] font-bold text-tcolor dark:text-white'>
                        Reset Password
                    </h1>

                    <p className='text-gray-500 text-sm max-w-[320px] dark:text-gray-300'>
                        Create a new password for your account. Make sure it is strong and secure.
                    </p>
                </div>
        <div className='px-8 flex flex-col gap-4'>
          <div className=''>
            <label htmlFor='password' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Password</label>
            <div className='relative'>
              <input id='password' type={show ? "text" : "password"} className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='8+ characters' autoComplete="new-password" />
              {show ?
                <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setShow(!show)} /> :
                <EyeOff size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setShow(!show)} />
              }
            </div>
          </div>
          <div className=''>
            <label htmlFor='confirmPassword' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Confirm Password</label>
            <div className='relative'>
              <input id='confirmPassword' type={confirmShow ? "text" : "password"} className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Confirm Your Password' autoComplete="new-password" />
              {confirmShow ?
                <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setConfirmShow(!confirmShow)} /> :
                <EyeOff size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setConfirmShow(!confirmShow)} />
              }
            </div>
          </div>
          <div className='pt-2 relative pb-7'>
            <button className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none'>Reset Password</button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Reset