import React from 'react'
import Container from '../components/layouts/Container'

const TrackOrder = () => {
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
             <input id='orderId' type="text" className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' placeholder='Found in your order confirmation email.'/>
           </div>
           <div className='lg:max-w-[50%] w-full'>
                <label htmlFor='billingEmail' className='block text-tcolor font-inter font-semibold pb-2 dark:text-gray-300 select-none'>Billing email</label>
             <input id='billingEmail' type="email" className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' placeholder='Email you used during checkout.' autoComplete="email"/>
           </div>
        </div>
        <button className='bg-gray-200 w-34 h-12 hover:bg-black dark:hover:border dark:hover:border-gray-200 hover:text-white text-black font-bold py-2 px-4 rounded-full mt-4 cursor-pointer transition-all duration-300 ease-in-out'>Track Order</button>
      </main>
    </Container>
  )
}

export default TrackOrder