import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router';
import { CircleAlertIcon, ArrowRight, Home } from 'lucide-react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import { resendOtp, verifyOtp } from '../hooks/Fetchdata';

const OtpVerification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ''
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [errs, setErrs] = useState({})
    const [touched, setTouched] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [resendDisabled, setResendDisabled] = useState(false)
    const [countdown, setCountdown] = useState(30)

    const handleChange = (index, value) => {
        if (value.length > 1) {
            value = value.slice(0, 1)
        }
        
        if (!/^\d*$/.test(value)) {
            return
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            if (nextInput) nextInput.focus()
        }

        if (touched.otp) {
            setErrs((prev) => ({ ...prev, otp: '' }))
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    const handleBlur = () => {
        setTouched(prev => ({ ...prev, otp: true }))
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        
        if (/^\d+$/.test(pastedData)) {
            const newOtp = [...otp]
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i]
            }
            setOtp(newOtp)
            
            const focusIndex = Math.min(pastedData.length, 5)
            const focusedInput = document.getElementById(`otp-${focusIndex}`)
            if (focusedInput) focusedInput.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrs({})
        setIsLoading(true)

        const otpValue = otp.join('')
        
        if (otpValue.length !== 6) {
            setErrs({ otp: 'Please enter a valid 6-digit OTP code' })
            setIsLoading(false)
            return
        }

        if (!email) {
            setErrs({ otp: 'Email is required. Please go back and enter your email.' })
            setIsLoading(false)
            return
        }

        try {
            const data = await verifyOtp({ email, otp: otpValue })
            
            toast.success(data.message || 'OTP verified successfully!', {
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

            navigate('/account', { replace: true })
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid or expired OTP code'
            setErrs({ otp: errorMessage })
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

    const handleResend = async () => {
        if (!email) {
            toast.error('Email is required. Please go back and enter your email.', {
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
            return
        }

        setResendDisabled(true)
        setCountdown(30)

        try {
            await resendOtp(email)
            
            toast.success('OTP sent successfully!', {
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
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to resend OTP'
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
            setResendDisabled(false)
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setResendDisabled(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    return (
        <main className="flex items-center justify-center px-4">
            <form className='flex flex-col shadow-lg w-full max-w-[424px] rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10' onSubmit={handleSubmit}>
                <div className='flex flex-col items-center text-center w-full gap-2 p-8'>
                    <h1 className='font-robot text-[20px] font-bold text-tcolor dark:text-white'>
                        Email Verification
                    </h1>

                    <p className='text-gray-500 text-sm max-w-[320px] dark:text-gray-300'>
                        Enter the 6-digit code sent to your email address to verify your account.
                    </p>

                    {email && (
                        <div className='bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md mt-2'>
                            <span className='text-sm text-gray-600 dark:text-gray-300'>
                                Code sent to: <span className='font-semibold text-tcolor dark:text-white'>{email}</span>
                            </span>
                        </div>
                    )}
                </div>

                <div className='px-8 flex flex-col gap-4'>
                    <div className=''>
                        <label className='font-inter text-tcolor block font-semibold pb-2 dark:text-gray-300 select-none'>OTP Code</label>
                        <div className='flex gap-2 justify-between'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className={`w-12 h-12 text-center text-xl font-semibold border rounded-sm outline-0 inputRing dark:placeholder:text-gray-300 ${
                                        errs.otp 
                                            ? 'border-2 border-red-400 placeholder:text-red-500' 
                                            : 'border-gray-200'
                                    }`}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onBlur={handleBlur}
                                    onPaste={handlePaste}
                                    autoComplete="one-time-code"
                                />
                            ))}
                        </div>
                        {errs.otp && 
                            <div className="flex items-start gap-1 mt-2 text-sm text-red-500 font-inter">
                                <CircleAlertIcon size={16} className="mt-0.5 shrink-0" />
                                <span className='font-semibold'>{errs.otp}</span>
                            </div>
                        }
                    </div>

                    <div className='pt-2 relative'>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>

                    <div className='select-none flex flex-col gap-y-2 pb-5 border-b border-gray-200'>
                        <div className='flex items-center justify-center gap-2'>
                            <span className='text-gray-500 text-sm dark:text-gray-300'>
                                Didn't receive the code?
                            </span>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendDisabled}
                                className='text-blue-500 hover:underline text-sm disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline'
                            >
                                {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
                            </button>
                        </div>
                        <Link 
                            to='/account/signup' 
                            className='text-blue-500 text-sm font-semibold hover:text-blue-600 hover:underline transition-colors cursor-pointer text-center'
                        >
                            Back to Sign up 
                        </Link>
                    </div>

                    <div className='pb-7 w-full'>
                        <button
                            type="button"
                            onClick={() => navigate('/account')}
                            className='flex items-center justify-center gap-2 text-[16px] text-[#0e78c4] font-inter hover:underline transition-colors cursor-pointer w-full'
                        >
                            <span>Explore with limited access</span>
                            <Home size={16} />
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default OtpVerification
