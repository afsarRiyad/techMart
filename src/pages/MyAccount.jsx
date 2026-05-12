import React from 'react'
import { Link } from 'react-router'

const MyAccount = () => {
  return (
    <div>
        <Link to='/account/login'><button className='bg-primary py-3 px-6 m-3 rounded-full '>Login</button></Link>
    </div>
  )
}

export default MyAccount