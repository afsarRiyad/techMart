import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router'
import Login from './Login'

import Container from '../components/layouts/Container';
import Dashboard from '../components/dashboard/Dashboard';
import { useGetUser } from '../hooks/Fetchdata';


const MyAccount = () => {
 let data = localStorage.getItem('user')
  let user = JSON.parse(data)
  console.log(user);
  
  
  if(!user) return <Navigate to='/account/signup' replace />;
  return (
    <>
            <div className='font-inter '>
              Hello <span className='font-semibold cursor-pointer pr-1'>{user.username}</span>
              (not <span className='font-semibold cursor-pointer pr-1'>{user.username}?</span>
               <Link to='/logout' className='hover:underline hover:text-blue-800'>Log out</Link>)
               <div className=' pt-5'>
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
               </div>
            </div>
    </>
  )
}

export default MyAccount