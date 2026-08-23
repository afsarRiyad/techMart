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
    <div>
        <div className='w-full max-w-[480px] flex relative left-0 h-13'>
        <input onChange={(e)=>hanldleCoupon(e)} value={couponData.code || ''} type="text" className='w-full border border-gray-400 border-r-0 rounded-s-full rounded-e-none outline-none  pl-8 pr-15' placeholder='Coupon code ' />
        <button onClick={applyCoupon} className='whitespace-normal w-60 bg-tcolor font-semibold rounded-e-full text-white cursor-pointer hover:bg-black transition-colors duration-200'>Apply coupon</button>
        </div>
    </div>
  )
}

export default CouponInput
