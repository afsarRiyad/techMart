import React, { useState } from 'react'
import Container from './../components/layouts/Container';
import { Link } from 'react-router';


const Forgot = () => {
    const [show, setShow] = useState(false)
    return (
        <main className="flex items-center justify-center px-4">
            <form className='flex flex-col  shadow-lg w-full max-w-[424px] rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10'>
                <div className='flex flex-col items-center text-center w-full gap-2 p-8'>
                    <h1 className='font-robot text-[20px] font-bold text-tcolor dark:text-white'>
                        Forgot Password
                    </h1>

                    <p className='text-gray-500 text-sm max-w-[320px] dark:text-gray-300'>
                        Enter the email address or mobile phone number associated with your Electro account.
                    </p>
                </div>
                <div className='px-8 flex flex-col gap-4 '>
                    <div className=''>
                        <div className='flex justify-between'>
                            <label htmlFor='password' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Email</label>
                            <Link to='/account/forgot-password' className='text-[#0e78c4]  font-inter text-[14px] leading-6 cursor-pointer hover:underline tracking-wide select-none'>Send again</Link>
                        </div>
                        <input type="email" className='w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300' placeholder='Enter Your Email' autoComplete="email" />
                    </div>
                    <div className='pt-2 relative'>
                        <button className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none'>Send Code </button>
                    </div>
                    <div className='select-none flex flex-col gap-y-2 pb-5 border-b border-gray-200'>
                        <span className='text-gray-500 text-sm dark:text-gray-300'>
                            Already have account?
                            <Link to='/account/login' className='text-blue-500 hover:underline pl-2'>
                                Sign In
                            </Link>
                        </span>
                        <span className='text-gray-500 text-sm dark:text-gray-300'>
                            Don't have account?
                            <Link to='/account/Signup' className='text-blue-500 hover:underline pl-2'>
                                Sign Up
                            </Link>
                        </span>
                    </div>
                    <div className='pb-7'>
                        <h1 className='text-[15px] text-tcolor font-inter'>You may contact <Link to='/customer-services' className='text-[#FA8232] hover:underline'>Customer Services</Link> for help restoring access to your account</h1>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Forgot