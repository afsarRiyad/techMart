import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router'
import Login from './Login'

const MyAccount = () => {
  let user = localStorage.getItem('user')
  if(user) return <Navigate to='/account' replace />;
           return <Navigate to='/account/login' replace />;

  return (
    <div>
       
    </div>
  )
}

export default MyAccount