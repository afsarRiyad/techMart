import React, { useState } from 'react'
import { Link, Navigate, replace, useNavigate } from 'react-router'

import Container from '../components/layouts/Container';
import Dashboard from '../components/dashboard/Dashboard';
import ProfileImageUpload from '../components/ui/ProfileImageUpload';
import { apiCustomer, clearCustomerToken } from '../api/apiCustomer';
import { useAuth } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';


const MyAccount = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError} = useAuth()
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate();
  const handleResend = async () => {
    try {
      await apiCustomer.post('/api/auth/resend-otp');
      navigate("/account/otp-verification", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleClick = async () => {
    try {
      await apiCustomer.post('/api/auth/logout')
      clearCustomerToken()
       queryClient.setQueryData(['me'], null);
    queryClient.removeQueries({ queryKey: ['me'] });
      navigate("/account/login");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <div className='font-inter'>
        {!data?.data?.isVerified && (
          <div className="flex items-center mb-6 justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div>
              <h3 className="text-sm font-semibold text-amber-900">
                Email Verification Required
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                Your account is currently operating with limited access. Verify your
                email address to unlock all features and enjoy the full experience.
              </p>
            </div>

            <button
              onClick={handleResend}
              className="shrink-0 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 cursor-pointer"
            >
              Verify Account
            </button>
          </div>
        )}
        
        <div className="flex items-start gap-8 mb-6">
          <ProfileImageUpload 
            currentImage={data?.data?.avatar} 
            username={data?.data?.username} 
          />
          
          <div className="flex-1">
            <p className="text-lg">
              Hello <span className='font-semibold cursor-pointer pr-1'>{data?.data?.username}</span>
              (not <span className='font-semibold cursor-pointer pr-1'>{data?.data?.username}?</span>
              <button onClick={handleClick} className='hover:underline hover:text-blue-800 bg-transparent border-none cursor-pointer ml-2'>
                Log out
              </button>)
            </p>
            <div className='pt-3'>
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount