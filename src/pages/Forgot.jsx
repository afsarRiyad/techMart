import React, { useState } from 'react'
import Container from './../components/layouts/Container';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast, Bounce } from "react-toastify";
import { apiCustomer } from '../api/apiCustomer';


const Forgot = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errs, setErrs] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrs({})
        setIsLoading(true)

        if (!email) {
            setErrs({ email: 'Please enter your email address' })
            setIsLoading(false)
            return
        }

        try {
            await apiCustomer.post('/api/auth/resend-otp',{email})
            
            toast.success('OTP sent successfully! Please check your email.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })

            navigate('/account/otp-verification', { state: { email } })
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send OTP'
            setErrs({ email: errorMessage })
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex items-center justify-center px-4">
            <form className='flex flex-col  shadow-lg w-full max-w-[424px] rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10' onSubmit={handleSubmit}>
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
                            <label htmlFor='email' className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>Email</label>
                        </div>
                        <input 
                            type="email" 
                            id='email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (errs.email) setErrs({ email: '' })
                            }}
                            className={`w-full border rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300 inputRing ${errs.email ? 'border-2 border-red-400 placeholder:text-red-500' : 'border-gray-200'}`} 
                            placeholder='Enter Your Email' 
                            autoComplete="email" 
                        />
                        {errs.email && 
                            <div className="flex items-start gap-1 mt-2 text-sm text-red-500 font-inter">
                                <span className='font-semibold'>{errs.email}</span>
                            </div>
                        }
                    </div>
                    <div className='pt-2 relative'>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Sending...' : 'Send Code'}
                        </button>
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
                    <div className='pb-7 w-full'>
                        <h1 className='text-[15px] text-tcolor font-inter dark:text-gray-300 text-center lg:text-left '>You may contact <Link to='/customer-services' className='text-[#FA8232] hover:underline'>Customer Services</Link> for help restoring access to your account</h1>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Forgot