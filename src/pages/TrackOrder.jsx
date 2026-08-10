import React, { useState } from 'react'
import Container from '../components/layouts/Container'
import { trackOrders } from '../features/user/services/userServices'
import toast from 'react-hot-toast'

const TrackOrder = () => {
  const [orderData, setOrderData] = useState({ orderId: "", email: "", });
   const handleTrack =async()=>{
     console.log(orderData);
     try {
     const response = trackOrders(orderData)
     console.log(response);
     
      toast.success('sdfs')
     } catch (error) {
      console.log(error.message);
      toast.error('something')
      
     }
   }
   
   
  return (
    <Container>
      <main className='text-inter py-2 pb-12 px-3 lg:px-5'> 
         <h1 className='text-[38px] text-tcolor flex justify-center pb-7 font-medium darkH'>Track your Order</h1>
         <span className='text-[15px] text-gray-500 leading-6 block pb-5 font-roboto content-center dark:text-gray-300 w-full mx-auto text-center  '>
            To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
         </span>
        <div className='flex flex-col lg:flex-row lg:gap-x-8 gap-y-4 w-full lg:gap-y-0'>
           <div className='lg:max-w-[50%] w-full w-[300px]'>
                <label htmlFor='orderId' className='block text-tcolor font-inter font-semibold pb-2 dark:text-gray-300 select-none'>Order ID</label>
             <input onChange={(e)=>setOrderData((prev)=>({...prev, orderId: e.target.value}))} id='orderId' type="text" className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' placeholder='Found in your order confirmation email.'/>
           </div>
           <div className='lg:max-w-[50%] w-full'>
                <label htmlFor='billingEmail' className='block text-tcolor font-inter font-semibold pb-2 dark:text-gray-300 select-none'>Billing email</label>
             <input id='billingEmail' onChange={(e)=>setOrderData((prev)=>({...prev, email: e.target.value}))} type="email" className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' placeholder='Email you used during checkout.' autoComplete="email"/>
           </div>
        </div>
        <button onClick={()=>handleTrack()} className='bg-gray-200 w-34 h-12 hover:bg-black dark:hover:border dark:hover:border-gray-200 hover:text-white text-black font-bold py-2 px-4 rounded-full mt-4 cursor-pointer transition-all duration-300 ease-in-out'>Track Order</button>
      </main>
    </Container>
  )
}

export default TrackOrder