import React, { useState } from 'react'
import Billing from '@/pages/Billing';
import Shipping from '@/pages/Shipping';
import { useNavigate } from 'react-router';

const AdressHeading =({setShow})=>{
  return(
    <>
          <p className='font-pop text-[14px] font-semibold text-gray-500'>The following addresses will be used on the checkout page by default.</p>
      <div className='flex gap-10 font-pop'>
        <div className='max-w-[50%] w-full'>
          <h2 className=' pb-2 pt-5 border-b border-b-gray-300 text-[28px] font-semibold text-tcolor'> 
          Billing address
          </h2>
          <button onClick={()=> setShow('billing')} className='w-full text-end text-gray-700 pt-10 pb-3 border-b border-b-gray-300'>
             Edit Billing address
          </button>
        </div>
        <div className='max-w-[50%] w-full'>
          <h2 className=' border-b pb-2 pt-5 border-b-gray-300 text-[28px] font-semibold text-tcolor'> 
          Shipping address
          </h2>
          <button onClick={()=> setShow('shipping')} className='w-full text-end text-gray-700 pt-10 pb-3 border-b border-b-gray-300'>
             Edit Shipping address
          </button>
        </div>
      </div>
      
    </>
  )
}

const Addresses = () => {
  const [show, setShow] = useState('list')
  const navigate = useNavigate();
  return (
    <>
    {show === "billing" && (
        <Billing setShow={setShow} />
      )}
    {show === "list" && (
        <AdressHeading setShow={setShow} />
      )}
    {show === "shipping" && (
        <Shipping setShow={setShow} />
      )}


    </>
  )
}

export default Addresses
