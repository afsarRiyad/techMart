import React, { useState } from 'react'
import { useApplyCoupon } from '@/features/cart/hooks/useApplyCoupon'

const CouponInput = ({setDiscount, subTotal}) => {
    const couponMutation = useApplyCoupon()
    const [couponData, setCouponData] = useState({})
    const applyCoupon =async ()=>{
     const payload = {
      ...couponData,
      orderTotal: Number(subTotal),
     }
    const res = await couponMutation.mutateAsync(payload)
     setDiscount(res.data);
      setCouponData({
          code: "",
        });
      }
      const hanldleCoupon=(e)=>{
     setCouponData({["code"]: e.target.value })
}

  return (
    <div className='w-full'>
        <div className='w-full max-w-[480px] flex relative left-0 min-h-13'>
        <input onChange={(e)=>hanldleCoupon(e)} value={couponData.code || ''} type="text" className='w-full min-w-0 border border-gray-400 dark:border-[#444444] dark:bg-[#242424] dark:text-gray-100 border-r-0 rounded-s-full rounded-e-none outline-none pl-5 sm:pl-8 pr-4' placeholder='Coupon code ' />
        <button onClick={applyCoupon} className='whitespace-normal shrink-0 w-40 sm:w-60 min-h-13 bg-tcolor font-semibold rounded-e-full text-white cursor-pointer hover:bg-black transition-colors duration-200'>Apply coupon</button>
        </div>
    </div>
  )
}

export default CouponInput
