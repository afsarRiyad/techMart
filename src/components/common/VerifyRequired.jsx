import { Link } from 'react-router'
import { ShieldAlert } from 'lucide-react'

// Replaces the page when the account is logged in but the email is not verified
// yet. The api answers those requests with 403 + requiresVerification, so the
// pages behind this are not shown at all.
const VerifyRequired = () => {
  return (
    <div className='px-4 py-16'>
      <div className='mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#181818]'>
        <ShieldAlert size={40} className='mx-auto mb-4 text-tcolor dark:text-yellow-500' />

        <h2 className='mb-2 text-[20px] font-semibold text-tcolor dark:text-white'>
          Verify your account
        </h2>

        <p className='mb-6 font-inter text-gray-500 dark:text-gray-400'>
          This section holds your order and account data, so it stays locked
          until your email is verified. Enter the 6 digit code we sent you.
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Link
            to='/account/otp-verification'
            className='inline-block rounded-full bg-primary px-6 py-3 font-semibold text-tcolor transition-colors duration-200 hover:bg-black hover:text-white dark:bg-yellow-500'
          >
            Enter the code
          </Link>

          <Link
            to='/'
            className='inline-block rounded-full border border-gray-300 px-6 py-3 font-semibold text-tcolor transition-colors duration-200 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-white/10'
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyRequired
